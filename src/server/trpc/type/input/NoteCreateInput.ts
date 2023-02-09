import type {infer as Infer} from "zod"
import {z} from "zod"

import {NoteStatusSchema} from "server/trpc/type/common/NoteStatus"

import {CompletionCreateInput} from "./CompletionCreateInput"

export const NoteCreateInput = z.object({
  title: z.string().min(1).max(255),
  details: z.string().nullable().optional(),
  status: NoteStatusSchema.optional(),
  completions: z.array(CompletionCreateInput).optional()
})

export type TNoteCreateInput = Infer<typeof NoteCreateInput>
