import type {infer as Infer} from "zod"
import {z} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {NoteCreateInput} from "server/trpc/type/input/NoteCreateInput"

export const NoteBaseOutput = Record
  .extend(NoteCreateInput.shape)
  .omit({completions: true})
  .required({status: true})
  .extend({
    details: z.string().nullish(),
    isCompleted: z.boolean(),
    isRejected: z.boolean(),
    isInProgress: z.boolean()
  })

export type TNoteBaseOutput = Infer<typeof NoteBaseOutput>
