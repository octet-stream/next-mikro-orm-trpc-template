import {router} from "server/trpc/def"

import create from "./create"

const pony = router({
  create
})

export default pony
