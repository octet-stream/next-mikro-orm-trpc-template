import type {input, output} from "zod"
import {z} from "zod"

import {createPageInput} from "../../helpers/createPageInput"
import {
  NoteStatusFilterSchema,
  NoteStatusFilter
} from "../common/NoteStatusFilter"

export const NotesPageInput = createPageInput({maxLimit: 500}, z.object({
  filter: z
    .object({
      status: NoteStatusFilterSchema.optional().default(NoteStatusFilter.ALL)
    })
    .optional()
    .default({})
}))

export type INotesPageInput = input<typeof NotesPageInput>

export type ONotesPageInput = output<typeof NotesPageInput>
