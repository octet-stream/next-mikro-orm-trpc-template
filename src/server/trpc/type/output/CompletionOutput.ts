import {infer as Infer} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {
  CompletionCreateInput
} from "server/trpc/type/input/CompletionCreateInput"

export const CompletionOutput = Record
  .extend(CompletionCreateInput.shape)

export type TCompletionOutput = Infer<typeof CompletionOutput>
