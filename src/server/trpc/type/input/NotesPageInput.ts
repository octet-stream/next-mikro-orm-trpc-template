import type {infer as Infer} from "zod"
import {z} from "zod"

import {createPageInput} from "server/trpc/helper/createPageInput"
import {NoteStatusFilterSchema} from "server/trpc/type/common/NoteStatusFilter"

export const NotesPageInput = z.intersection(
  createPageInput({maxLimit: 100}),
  z.object({
    filter: z
      .object({
        status: NoteStatusFilterSchema.optional()
      })
      .optional()
      .default({})
  }).optional()
)

export type TNotesPageInput = Infer<typeof NotesPageInput>
