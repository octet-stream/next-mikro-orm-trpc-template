import type {input, output} from "zod"

import {createCollectionOutput} from "server/trpc/helper/createCollectionOutput"
import type {OCompletionOutput} from "server/trpc/type/output/CompletionOutput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NoteOutput = NoteBaseOutput.extend({
  completions: createCollectionOutput<OCompletionOutput>().nullable().optional()
})

export type INoteOutput = input<typeof NoteOutput>

export type ONoteOutput = output<typeof NoteOutput>
