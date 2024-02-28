import type {input, output} from "zod"
import {z} from "zod"

import {NoteStatusSchema} from "../common/NoteStatus"

export const NoteCreateInput = z.object({
  title: z.string().min(1).max(255),
  details: z.string().nullable().optional(),
  status: NoteStatusSchema.optional()
})

export type INoteCreateInput = input<typeof NoteCreateInput>

export type ONoteCreateInput = output<typeof NoteCreateInput>
