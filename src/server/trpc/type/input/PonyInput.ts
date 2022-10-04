import {z, infer as Infer} from "zod"

import {PonyRace} from "server/db/entity/Pony"

export const PonyInput = z.object({
  name: z.string().min(1),
  race: z.nativeEnum(PonyRace)
})

export interface IPonyInput extends Infer<typeof PonyInput> { }
