import type {infer as Infer} from "zod"
import {z} from "zod"

import {Node} from "server/trpc/type/common/Node"

export const NoteRemoveInput = Node.extend({
  soft: z.boolean().optional().default(false)
})

export type TNoteRemoveInput = Infer<typeof NoteRemoveInput>
