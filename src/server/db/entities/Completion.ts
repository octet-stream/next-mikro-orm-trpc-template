import {
  Entity,
  Property,
  ManyToOne,
  Cascade
} from "@mikro-orm/mysql"

import {Note} from "./Note"
import {Record} from "./Record"

@Entity({tableName: "completion"})
export class Completion extends Record {
  @Property({type: "text"})
  details!: string

  @Property()
  completed: boolean = false

  @ManyToOne(() => Note, {cascade: [Cascade.ALL], nullable: false})
  note!: Note
}
