import {router} from "../../def"

import {getById} from "./getById"

import {create} from "./create"
import {update} from "./update"
import {remove} from "./remove"
import {restore} from "./restore"

export const note = router({
  // Queries
  getById,

  // Mutations
  create,
  update,
  remove,
  restore
})
