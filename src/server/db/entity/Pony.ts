import {Entity, Property, Enum, OptionalProps} from "@mikro-orm/core"
import {isString} from "lodash"

import type {IPonyOutput} from "server/trpc/type/output/PonyOutput"
import {PonyRace} from "server/trpc/type/common/PonyRace"

import type {OptionalDates} from "./BaseDates"
import {BaseDates} from "./BaseDates"

const races = [...new Set(Object.values(PonyRace).filter(isString))]

/**
 * @deprecated Pony was replaced with Note and Completion
 */
@Entity()
export class Pony extends BaseDates implements IPonyOutput {
  [OptionalProps]?: OptionalDates

  @Property()
  name!: string

  // ! MikroORM can't discover emun when it declared in separate file. To fix this, we extract values from enum manually
  @Enum({items: races, type: "string"})
  race!: PonyRace
}
