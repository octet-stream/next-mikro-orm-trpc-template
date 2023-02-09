import {
  Entity,
  Property,
  ManyToOne,
  OptionalProps,
  Cascade
} from "@mikro-orm/core"

// eslint-disable-next-line import/no-cycle
import {Note} from "./Note"
import {BaseDates} from "./BaseDates"
import type {OptionalDates} from "./BaseDates"

@Entity()
export class Completion extends BaseDates {
  [OptionalProps]?: OptionalDates

  @Property({type: "text"})
  details!: string

  @Property()
  completed: boolean = false

  @ManyToOne(() => Note, {cascade: [Cascade.ALL], nullable: false})
  note!: Note
}
