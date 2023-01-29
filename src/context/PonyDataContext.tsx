import type {IPonyOutput} from "server/trpc/type/output/PonyOutput"

import {createDataContext} from "lib/context/createDataContext"

export const {
  Context: PonyDataContext,
  useDataContext: usePonyDataContext,
  withDataContext: withPonyDataContext,
  DataContextProvider: PonyDataProvider
} = createDataContext<IPonyOutput>()
