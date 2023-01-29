import {Entity, Property} from "@mikro-orm/core"

import type {PickKeys} from "lib/type/PickKeys"

import type {INodeWithDates} from "server/trpc/type/common/NodeWithDates"

import {Base} from "./Base"

@Entity({abstract: true})
export abstract class BaseDates extends Base implements INodeWithDates {
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
