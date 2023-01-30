import {z, infer as Infer} from "zod"

export const Node = z.object({
  id: z.string().min(1).max(255).regex(/^[a-z0-9-_]+$/i)
})

export interface INode extends Infer<typeof Node> { }
