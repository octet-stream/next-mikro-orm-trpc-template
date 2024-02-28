import {
  Entity,
  Property,
  ManyToOne,
  Cascade
} from "@mikro-orm/core"

import {Note} from "./Note"
import {BaseDates} from "./BaseDates"

@Entity({tableName: "completion"})
export class Completion extends BaseDates {
  @Property({type: "text"})
  details!: string

  @Property()
  completed: boolean = false

  @ManyToOne(() => Note, {cascade: [Cascade.ALL], nullable: false})
  note!: Note
}
