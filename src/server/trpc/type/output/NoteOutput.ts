import type {input, output} from "zod"

import {createCollectionOutput} from "server/trpc/helper/createCollectionOutput"
import {CompletionOutput} from "server/trpc/type/output/CompletionOutput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NoteOutput = NoteBaseOutput.extend({
  completions: createCollectionOutput(CompletionOutput).nullable().optional()
})

export type INoteOutput = input<typeof NoteOutput>

export type ONoteOutput = output<typeof NoteOutput>
