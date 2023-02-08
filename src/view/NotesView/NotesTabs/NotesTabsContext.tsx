import {createContext, useContext, useState, useMemo} from "react"
import {useEvent} from "react-use-event-hook"
import type {FC, ReactNode} from "react"

import type {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"
import type {MaybeUndefined} from "lib/type/MaybeUndefined"

import {tabs} from "./tabs"

export interface INotesTabsContext {
  readonly index: number
  readonly tab: NoteStatusFilter
  readonly isLoading: boolean

  setIndex(index: number): void
  setLoading(isLoading: boolean): void
}

const NotesTabsContext = createContext<MaybeUndefined<INotesTabsContext>>(
  undefined
)

interface ProviderProps {
  children: ReactNode
}

export const NotesTabsContextProvider: FC<ProviderProps> = ({children}) => {
  const [isLoading, setLoadingState] = useState(false)
  const [index, setIndexState] = useState(0)

  const tab = useMemo(() => tabs[index], [index])

  const setIndex = useEvent((value: number) => setIndexState(value))

  const setLoading = useEvent((value: boolean) => setLoadingState(value))

  const context = useMemo<INotesTabsContext>(
    () => ({index, tab, isLoading, setLoading, setIndex}),

    [index, tab, isLoading, setIndex, setLoading]
  )

  return (
    <NotesTabsContext.Provider value={context}>
      {children}
    </NotesTabsContext.Provider>
  )
}

export function useNotesTabsContext(): INotesTabsContext {
  const context = useContext(NotesTabsContext)

  if (!context) {
    throw new Error("Can't get access to NotesTansContext")
  }

  return context
}
