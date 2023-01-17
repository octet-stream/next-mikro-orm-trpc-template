import {Entity, Property, Enum, OptionalProps} from "@mikro-orm/core"

import type {IPonyOutput} from "server/trpc/type/output/PonyOutput"
// import {PonyRace} from "server/trpc/type/common/PonyRace"

import type {OptionalDates} from "./BaseDates"
import {BaseDates} from "./BaseDates"

// FIXME: MikroORM can't discover if enum defined in different file. Deduplicate this enum and find the solution.
export enum PonyRace {
  EARTH_PONY = "earth_pony",
  UNICORN = "unicorn",
  PEGASUS = "pegasus",
  ALICORN = "alicorn"
}

@Entity()
export class Pony extends BaseDates implements IPonyOutput {
  [OptionalProps]?: OptionalDates

  @Property()
  name!: string

  @Enum(() => PonyRace)
  race!: PonyRace
}

// Re-export so that mikro-orm can see this type
// export {PonyRace}
