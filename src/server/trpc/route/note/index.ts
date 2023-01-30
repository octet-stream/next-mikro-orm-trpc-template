import {router} from "server/trpc/def"

import {create} from "./create"
import {update} from "./update"

export const note = router({
  create,
  update
})
