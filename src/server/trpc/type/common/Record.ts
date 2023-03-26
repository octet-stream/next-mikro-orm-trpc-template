import type {input, output} from "zod"

import {Node} from "./Node"
import {DateTime} from "./DateTime"

export const Record = Node.extend({
  createdAt: DateTime,
  updatedAt: DateTime
})

export type IRecord = input<typeof Record>

export type ORecord = output<typeof Record>
