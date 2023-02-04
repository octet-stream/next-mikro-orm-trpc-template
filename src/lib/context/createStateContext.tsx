import type {INTERNAL_Snapshot as Snapshot} from "valtio"
import {useMemo, useContext, createContext} from "react"
import type {FC, ReactNode, Context} from "react"
import {proxy, useSnapshot} from "valtio"

import {MaybeUndefined} from "lib/type/MaybeUndefined"

type UseSnapshotOptions = Parameters<typeof useSnapshot>[1]

interface ProviderProps<T extends object> {
  data: T
  children: ReactNode
}

interface CreateStateContextResult<T extends object> {
  /**
   * Plain `StateContext` object. Typically you won't need to use it directly.
   */
  StateContext: Context<MaybeUndefined<T>>

  /**
   * Wraps its child components into the `StateContext`. Creates `valtio` state object for given `data` property.
   */
  StateContextProvider: FC<ProviderProps<T>>

  /**
   * Returns proxy state snapshot.
   * Use this hook to create loacal snapshots to *read* the data fro the state.
   */
  useStateSnapshot(options?: UseSnapshotOptions): Snapshot<T>

  /**
   * Returns *mutable* proxy state object.
   * Use this data to *modify* the data within the state.
   */
  useStateProxy(): T
}

/**
 * Creates `valtio` state object with `React.createContext`, and bunch of utilities to get access this state from within the context.
 */
export const createStateContext = <
  T extends object
>(): CreateStateContextResult<T> => {
  const StateContext = createContext<MaybeUndefined<T>>(undefined)

  const StateContextProvider: FC<ProviderProps<T>> = ({data, children}) => {
    // Use `useMemo` instead of `useRef` with `valtio`, so that we can reload page state if the `data` is changed
    const state = useMemo(() => proxy(data), [data])

    return (
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    )
  }

  function useStateProxy() {
    const proxy = useContext(StateContext)

    if (!proxy) {
      throw new Error("Can't get access to state context.")
    }

    return proxy
  }

  function useStateSnapshot(options?: UseSnapshotOptions) {
    const proxy = useStateProxy()

    return useSnapshot(proxy, options)
  }

  return {
    StateContext,
    StateContextProvider,
    useStateProxy,
    useStateSnapshot
  }
}
