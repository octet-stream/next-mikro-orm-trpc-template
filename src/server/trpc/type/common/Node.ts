import type {infer as Infer} from "zod"
import {z} from "zod"

export const Node = z.object({
  id: z.string().min(1).max(255).regex(/^[a-z0-9-_]+$/i)
})

export type TNode = Infer<typeof Node>
