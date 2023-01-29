import type {IPoniesPageOutput} from "server/trpc/type/output/PoniesPageOutput"

import {createDataContext} from "lib/context/createDataContext"

export const {
  Context: PoniesDataContext,
  useDataContext: usePoniesDataContext,
  withDataContext: withPoniesDataContext,
  DataContextProvider: PoniesDataProvider
} = createDataContext<IPoniesPageOutput>()
