import {useRef, useContext, createContext} from "react"
import {proxy, useSnapshot} from "valtio"
import type {FC, ReactNode} from "react"

type UseSnapshotOptions = Parameters<typeof useSnapshot>[1]

interface ProviderProps<T extends object> {
  data: T
  children: ReactNode
}

export const createStateContext = <T extends object>() => {
  const StateContext = createContext<T | undefined>(undefined)

  const StateContextProvider: FC<ProviderProps<T>> = ({data, children}) => {
    const state = useRef(proxy(data)).current

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
  } as const
}
