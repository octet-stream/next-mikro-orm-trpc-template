import type {infer as Infer} from "zod"
import {z} from "zod"

import {Node} from "server/trpc/type/common/Node"

export const RemoveOutput = Node.extend({
  success: z.boolean().default(true),
  soft: z.boolean().default(false)
})

export type TRemoveOutput = Infer<typeof RemoveOutput>
