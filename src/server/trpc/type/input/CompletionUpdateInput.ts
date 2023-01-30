import {infer as Infer} from "zod"

import {CompletionCreateInput} from "./CompletionCreateInput"

export const CompletionUpdateInput = CompletionCreateInput.partial()

export type TCompletionUpdateInput = Infer<typeof CompletionUpdateInput>
