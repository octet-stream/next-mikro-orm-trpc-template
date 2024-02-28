/* eslint-disable no-use-before-define */
import {
  Entity,
  Property,
  Enum,
  Collection,
  OneToMany,
  Filter,
  type Opt
} from "@mikro-orm/core"

import isString from "lodash/isString"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"
import {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"

import type {MaybeNull} from "lib/type/MaybeNull"

import {BaseDates} from "./BaseDates"

import {Completion} from "./Completion"

const statuses = Object.values(NoteStatus).filter(isString)

@Entity({tableName: "note"})
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
  @Property({length: 255})
  title!: string

  @Property({type: "text", nullable: true})
  details!: MaybeNull<Opt<string>>

  @Enum({type: "string", items: statuses})
  status: Opt<NoteStatus> = NoteStatus.INCOMPLETED

  @OneToMany(() => Completion, completion => completion.note)
  completions = new Collection<Completion, Note>(this)

  get isCompleted(): Opt<boolean> {
    return this.status === NoteStatus.COMPLETED
  }

  get isRejected(): Opt<boolean> {
    return this.status === NoteStatus.REJECTED
  }

  get isInProgress(): Opt<boolean> {
    return this.status === NoteStatus.IN_PROGRESS
  }

  get isPaused(): Opt<boolean> {
    return this.status === NoteStatus.PAUSED
  }
}
