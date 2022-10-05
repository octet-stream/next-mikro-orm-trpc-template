import {Entity, Property} from "@mikro-orm/core"

import type {INodeWithDates} from "server/trpc/type/common/NodeWithDates"

import {Base} from "./Base"

export type OptionalDates = "createdAt" | "updatedAt"

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
