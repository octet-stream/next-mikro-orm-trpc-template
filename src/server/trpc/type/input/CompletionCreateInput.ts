import type {input, output} from "zod"
import {z} from "zod"

export const CompletionCreateInput = z.object({
  details: z.string().min(1),
  completed: z.boolean().default(false)
})

export type ICompletionCreateInput = input<typeof CompletionCreateInput>

export type OCompletionCreateInput = output<typeof CompletionCreateInput>
