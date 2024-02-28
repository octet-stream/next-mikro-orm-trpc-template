import type {input, output} from "zod"

import {createCollectionOutput} from "../../helpers/createCollectionOutput"
import {CompletionOutput} from "../completion/CompletionOutput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NoteOutput = NoteBaseOutput.extend({
  completions: createCollectionOutput(CompletionOutput).nullable().optional()
})

export type INoteOutput = input<typeof NoteOutput>

export type ONoteOutput = output<typeof NoteOutput>
