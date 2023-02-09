import {router} from "server/trpc/def"

import {list} from "./list"

export const notes = router({
  list
})
