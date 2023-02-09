import type {infer as Infer} from "zod"
import {z} from "zod"

export const CompletionCreateInput = z.object({
  details: z.string().min(1),
  completed: z.boolean().default(false)
})

export type TCompletionCreateInput = Infer<typeof CompletionCreateInput>
