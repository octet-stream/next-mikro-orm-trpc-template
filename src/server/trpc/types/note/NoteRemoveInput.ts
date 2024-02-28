import type {input, output} from "zod"
import {z} from "zod"

import {Node} from "../common/Node"

export const NoteRemoveInput = Node.extend({
  soft: z.boolean().optional().default(false)
})

export type INoteRemoveInput = input<typeof NoteRemoveInput>

export type ONoteRemoveInput = output<typeof NoteRemoveInput>
