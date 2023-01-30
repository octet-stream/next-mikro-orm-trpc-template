import type {TNoteOutput} from "server/trpc/type/output/NoteOutput"

import {createDataContext} from "lib/context/createDataContext"

export const {
  Context: NoteDataContext,
  useDataContext: useNoteDataContext,
  DataContextProvider: NoteDataContextProvider,
} = createDataContext<TNoteOutput>()
