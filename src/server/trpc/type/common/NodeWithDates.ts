import {z, infer as Infer} from "zod"

import {Node} from "./Node"

export const NodeWithDates = Node.extend({
  createdAt: z.date(),
  updatedAt: z.date()
})

export interface INodeWithDates extends Infer<typeof NodeWithDates> { }
