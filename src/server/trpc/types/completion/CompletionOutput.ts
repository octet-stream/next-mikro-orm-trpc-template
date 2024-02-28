import type {input, output} from "zod"

import {Record} from "../common/Record"
import {CompletionCreateInput} from "./CompletionCreateInput"

export const CompletionOutput = Record.extend(CompletionCreateInput.shape)

export type ICompletionOutput = input<typeof CompletionOutput>

export type OCompletionOutput = output<typeof CompletionOutput>
