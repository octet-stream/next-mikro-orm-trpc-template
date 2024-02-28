import type {ONoteOutput} from "../server/trpc/types/note/NoteOutput"

import {createStateContext} from "../lib/contexts/createStateContext"

export const {
  StateContext: NoteStateContext,
  StateContextProvider: NoteStateContextProvider,
  useStateSnapshot: useNoteStateSnapshot,
  useStateProxy: useNoteStateProxy
} = createStateContext<ONoteOutput>()
