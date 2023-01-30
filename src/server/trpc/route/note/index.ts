import {router} from "server/trpc/def"

import {create} from "./create"
import {update} from "./update"
import {remove} from "./remove"

export const note = router({
  create,
  update,
  remove
})
