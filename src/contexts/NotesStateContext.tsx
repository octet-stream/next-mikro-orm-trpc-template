import type {ONotesPageOutput} from "../server/trpc/types/note/NotesPageOutput"

import {createStateContext} from "../lib/contexts/createStateContext"

export const {
  StateContext: NotesStateContext,
  StateContextProvider: NotesStateContextProvider,
  useStateSnapshot: useNotesStateSnapshot,
  useStateProxy: useNotesStateProxy
} = createStateContext<ONotesPageOutput>()
