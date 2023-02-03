import type {infer as Infer} from "zod"
import {z} from "zod"

import {createPageInput} from "server/trpc/helper/createPageInput"
import {NoteStatusFilterSchema} from "server/trpc/type/common/NoteStatusFilter"

export const NotesPageInput = createPageInput({maxLimit: 500}, z.object({
  filter: z
    .object({status: NoteStatusFilterSchema.optional()})
    .optional()
    .default({})
}))

export type TNotesPageInput = Infer<typeof NotesPageInput>
