import type {input, output} from "zod"
import {z} from "zod"

import {Record} from "../common/Record"

import {NoteCreateInput} from "./NoteCreateInput"

export const NoteBaseOutput = Record
  .extend(NoteCreateInput.shape)
  .required({status: true})
  .extend({
    details: z.string().nullish().transform(details => details ?? null),
    isCompleted: z.boolean(),
    isRejected: z.boolean(),
    isInProgress: z.boolean(),
    isPaused: z.boolean()
  })

export type INoteBaseOutput = input<typeof NoteBaseOutput>

export type ONoteBaseOutput = output<typeof NoteBaseOutput>
