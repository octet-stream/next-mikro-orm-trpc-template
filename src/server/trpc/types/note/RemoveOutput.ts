import type {input, output} from "zod"
import {z} from "zod"

import {Node} from "../common/Node"

export const RemoveOutput = Node.extend({
  success: z.boolean().default(true),
  soft: z.boolean().default(false)
})

export type IRemoveOutput = input<typeof RemoveOutput>

export type ORemoveOutput = output<typeof RemoveOutput>
