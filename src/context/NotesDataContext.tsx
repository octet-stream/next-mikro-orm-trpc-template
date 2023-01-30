import type {TNotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

import {createDataContext} from "lib/context/createDataContext"

export const {
  Context: NotesDataContext,
  useDataContext: useNotesDataContext,
  DataContextProvider: NotesDataContextProvider,
} = createDataContext<TNotesPageOutput>()
