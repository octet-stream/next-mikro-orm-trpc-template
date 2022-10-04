import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import pony from "./pony"

const mutation = router<GlobalContext>()
  .merge("pony.", pony)

export default mutation
