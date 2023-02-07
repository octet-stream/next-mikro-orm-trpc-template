import type {infer as Infer} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {CompletionCreateInput} from "./CompletionCreateInput"

export const CompletionUpdateInput = Node.extend(
  CompletionCreateInput.partial().shape
)

export type TCompletionUpdateInput = Infer<typeof CompletionUpdateInput>
