import type {input, output} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {
  CompletionCreateInput
} from "server/trpc/type/input/CompletionCreateInput"

export const CompletionOutput = Record.extend(CompletionCreateInput.shape)

export type ICompletionOutput = input<typeof CompletionOutput>

export type OCompletionOutput = output<typeof CompletionOutput>
