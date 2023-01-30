import {z, infer as Infer} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {createCollectionOutput} from "server/trpc/helper/createCollectionOutput"
import type {TCompletionOutput} from "server/trpc/type/output/CompletionOutput"
import {NoteCreateInput} from "server/trpc/type/input/NoteCreateInput"

export const NoteOutput = Record
  .extend(NoteCreateInput.shape)
  .extend({
    completions: createCollectionOutput<TCompletionOutput>(),
    details: z.string().nullable(),
  })
  .required({
    completions: true,
    status: true
  })

export type TNoteOutput = Infer<typeof NoteOutput>
