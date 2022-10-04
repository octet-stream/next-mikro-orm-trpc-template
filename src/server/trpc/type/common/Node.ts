import {z, infer as Infer} from "zod"

export const Node = z.object({
  id: z.string().uuid()
})

export interface INode extends Infer<typeof Node> { }
