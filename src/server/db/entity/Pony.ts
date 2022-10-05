import {Entity, Property, Enum, OptionalProps} from "@mikro-orm/core"

import type {OptionalDates} from "./BaseDates"
import {BaseDates} from "./BaseDates"

export enum PonyRace {
  EARTH_PONY = "earth_pony",
  UNICORN = "unicorn",
  PEGASUS = "pegasus",
  ALICORN = "alicorn"
}

@Entity()
export class Pony extends BaseDates {
  [OptionalProps]?: OptionalDates

  @Property()
  name!: string

  @Enum(() => PonyRace)
  race!: PonyRace
}
