import {infer as Infer} from "zod"

import {createCollectionOutput} from "server/trpc/helper/createCollectionOutput"
import type {TCompletionOutput} from "server/trpc/type/output/CompletionOutput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NoteOutput = NoteBaseOutput.extend({
  completions: createCollectionOutput<TCompletionOutput>().nullable().optional()
})

export type TNoteOutput = Infer<typeof NoteOutput>
