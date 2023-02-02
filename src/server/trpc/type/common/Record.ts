import type {infer as Infer} from "zod"

import {Node} from "./Node"
import {DateTime} from "./DateTime"

export const Record = Node.extend({
  createdAt: DateTime,
  updatedAt: DateTime
})

export type TRecord = Infer<typeof Record>
