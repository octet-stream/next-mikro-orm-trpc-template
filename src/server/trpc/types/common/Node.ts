import type {input, output} from "zod"
import {z} from "zod"

export const Node = z.object({
  id: z.string().min(1).max(255).regex(/^[a-z0-9-_]+$/i)
})

export type INode = input<typeof Node>

export type ONode = output<typeof Node>
