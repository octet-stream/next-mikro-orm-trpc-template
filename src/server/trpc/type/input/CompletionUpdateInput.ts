import type {input, output} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {CompletionCreateInput} from "./CompletionCreateInput"

export const CompletionUpdateInput = Node.extend(
  CompletionCreateInput.partial().shape
)

export type ICompletionUpdateInput = input<typeof CompletionUpdateInput>

export type OCompletionUpdateInput = output<typeof CompletionUpdateInput>
