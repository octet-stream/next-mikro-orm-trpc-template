import type {ONoteOutput} from "server/trpc/type/output/NoteOutput"

import {createStateContext} from "lib/context/createStateContext"

export const {
  StateContext: NoteStateContext,
  StateContextProvider: NoteStateContextProvider,
  useStateSnapshot: useNoteStateSnapshot,
  useStateProxy: useNoteStateProxy
} = createStateContext<ONoteOutput>()
