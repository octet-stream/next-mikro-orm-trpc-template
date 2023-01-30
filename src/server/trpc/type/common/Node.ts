import {z, infer as Infer} from "zod"

export const Node = z.object({
  id: z.string().min(1).max(255).regex(/^[a-z0-9-_]+$/i)
})

/**
 * @deprecated use `TNode` instead
 */
export interface INode extends Infer<typeof Node> { }

export type TNode = Infer<typeof Node>
