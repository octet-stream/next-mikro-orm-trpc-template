/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import {
  Entity,
  Property,
  Enum,
  OptionalProps,
  Collection,
  OneToMany,
  Filter
} from "@mikro-orm/core"

import isString from "lodash/isString"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import type {MaybeNull} from "lib/type/MaybeNull"
import type {PickKeys} from "lib/type/PickKeys"

import {BaseDates} from "./BaseDates"
import type {OptionalDates} from "./BaseDates"

import {Completion} from "./Completion"

const statuses = Object.values(NoteStatus).filter(isString)

@Entity()
@Filter<Note>({
  name: "active",
  cond: {status: {$ne: NoteStatus.REJECTED}},
  default: true
})
export class Note extends BaseDates {
  // eslint-disable-next-line no-use-before-define
  [OptionalProps]?: OptionalDates | PickKeys<Note, "details" | "status" | "isCompleted" | "isInProgress" | "isRejected">

  @Property({length: 255})
  title!: string

  @Property({type: "text", nullable: true})
  details!: MaybeNull<string>

  @Enum({type: "string", items: statuses})
  status: NoteStatus = NoteStatus.INCOMPLETED

  @OneToMany(() => Completion, completion => completion.note)
  completions = new Collection<Completion, Note>(this)

  @Property({persist: false})
  get isCompleted(): boolean {
    return this.status === NoteStatus.COMPLETED
  }

  @Property({persist: false})
  get isRejected(): boolean {
    return this.status === NoteStatus.REJECTED
  }

  @Property({persist: false})
  get isInProgress(): boolean {
    return this.status === NoteStatus.IN_PROGRESS
  }
}
