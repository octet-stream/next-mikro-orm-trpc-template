import {Entity, Property} from "@mikro-orm/core"

import type {PickKeys} from "lib/type/PickKeys"

import type {TRecord} from "server/trpc/type/common/Record"

import {Base} from "./Base"

@Entity({abstract: true})
export abstract class BaseDates extends Base implements TRecord {
  /**
   * Date and time the entity was created
  */
 @Property()
 readonly createdAt: Date = new Date()

 /**
  * Most recent date and time the entity was updated
 */
@Property({onUpdate: () => new Date()})
readonly updatedAt: Date = new Date()
}

export type OptionalDates = PickKeys<BaseDates, "createdAt" | "updatedAt">
