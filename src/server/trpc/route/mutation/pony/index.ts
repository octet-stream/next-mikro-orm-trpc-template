import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import create from "./create"

const pony = router<GlobalContext>()
  .merge(create)

export default pony
