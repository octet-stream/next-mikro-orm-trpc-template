import {router} from "@trpc/server"

import {GlobalContext} from "server/trpc/context"

import hello from "./hello"
import ponies from "./ponies"

const query = router<GlobalContext>()
  .merge(hello)
  .merge("ponies.", ponies)

export default query
