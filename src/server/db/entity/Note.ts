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
import {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"

import type {MaybeNull} from "lib/type/MaybeNull"
import type {PickKeys} from "lib/type/PickKeys"

import {BaseDates} from "./BaseDates"
import type {OptionalDates} from "./BaseDates"

import {Completion} from "./Completion"

const statuses = Object.values(NoteStatus).filter(isString)

@Entity()
@Filter<Note>({
  name: NoteStatusFilter.ALL,
  cond: {status: {$ne: NoteStatus.REJECTED}},
  default: true
})
@Filter<Note>({
  name: NoteStatusFilter.ACTIVE,
  cond: {status: NoteStatus.INCOMPLETED}
})
@Filter<Note>({
  name: NoteStatusFilter.COMPLETED,
  cond: {status: NoteStatus.COMPLETED}
})
@Filter<Note>({
  name: NoteStatusFilter.REJECTED,
  cond: {status: NoteStatus.REJECTED}
})
export class Note extends BaseDates {
  [OptionalProps]?: PickKeys<Note, OptionalDates | "details" | "status" | "isCompleted" | "isInProgress" | "isRejected" | "isPaused">

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

  @Property({persist: false})
  get isPaused(): boolean {
    return this.status === NoteStatus.PAUSED
  }
}
