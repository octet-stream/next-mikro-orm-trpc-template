import type {ONotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

import {createStateContext} from "lib/context/createStateContext"

export const {
  StateContext: NotesStateContext,
  StateContextProvider: NotesStateContextProvider,
  useStateSnapshot: useNotesStateSnapshot,
  useStateProxy: useNotesStateProxy
} = createStateContext<ONotesPageOutput>()
