import {
  Entity,
  Property,
  Enum,
  OptionalProps,
  Collection,
  OneToMany,
} from "@mikro-orm/core"

import isString from "lodash/isString"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import type {MaybeNull} from "lib/type/MaybeNull"
import type {PickKeys} from "lib/type/PickKeys"

import {BaseDates} from "./BaseDates"
import type {OptionalDates} from "./BaseDates"

// eslint-disable-next-line import/no-cycle
import {Completion} from "./Completion"

const statuses = [...new Set(Object.values(NoteStatus).filter(isString))]

@Entity()
export class Note extends BaseDates {
  // eslint-disable-next-line no-use-before-define
  [OptionalProps]?: OptionalDates | PickKeys<Note, "details" | "status">

  @Property({length: 255})
  title!: string

  @Property({type: "text", nullable: true})
  details!: MaybeNull<string>

  @Enum({type: "string", items: statuses})
  status: NoteStatus = NoteStatus.INCOMPLETED

  @OneToMany(() => Completion, completion => completion.note)
  completions = new Collection<Completion, Note>(this)
}
