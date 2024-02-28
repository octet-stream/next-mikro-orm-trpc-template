/* eslint-disable no-use-before-define */
import {
  Entity,
  Property,
  Enum,
  Collection,
  OneToMany,
  Filter,
  type Opt
} from "@mikro-orm/mysql"

import isString from "lodash/isString"

import {NoteStatus} from "../../trpc/types/common/NoteStatus"
import {NoteStatusFilter} from "../../trpc/types/common/NoteStatusFilter"

import type {MaybeNull} from "../../../lib/types/MaybeNull"

import {Record} from "./Record"

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
export class Note extends Record {
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
