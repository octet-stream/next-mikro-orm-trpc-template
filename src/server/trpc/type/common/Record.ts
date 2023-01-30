import {z, infer as Infer} from "zod"

import {Node} from "./Node"

export const Record = Node.extend({
  createdAt: z.date(),
  updatedAt: z.date()
})

export type TRecord = Infer<typeof Record>
