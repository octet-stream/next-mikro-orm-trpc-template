import {z, infer as Infer} from "zod"

import {PonyRaceSchema} from "server/trpc/type/common/PonyRace"

export const PonyInput = z.object({
  name: z.string().min(1),
  race: PonyRaceSchema
})

export interface IPonyInput extends Infer<typeof PonyInput> { }
