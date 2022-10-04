import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import list from "./list"

const ponies = router<GlobalContext>()
  .merge(list)

export default ponies
