import anyTest from "ava"

import type {TestFn} from "ava"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test("Creates a note", withTRPC, async (t, trpc) => {
  const actual = await trpc.note.create({
    title: "Test note #1"
  })

  t.is(actual.title, "Test note #1")
  t.is(actual.status, NoteStatus.INCOMPLETED)
  t.is(actual.details, null)
})

test("Creates a note with given status", withTRPC, async (t, trpc) => {
  const actual = await trpc.note.create({
    title: "Test note #2",
    status: NoteStatus.IN_PROGRESS
  })

  t.is(actual.status, NoteStatus.IN_PROGRESS)
})
