import anyTest from "ava"

import {ZodError} from "zod"
import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"

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
  t.is(actual.details, undefined)
})

test("Creates a note with given status", withTRPC, async (t, trpc) => {
  const actual = await trpc.note.create({
    title: "Test note #2",
    status: NoteStatus.IN_PROGRESS
  })

  t.is(actual.status, NoteStatus.IN_PROGRESS)
})

test("Fails creating a note with unknown status", withTRPC, async (t, trpc) => {
  const trap = () => trpc.note.create({
    title: "Test note #3",

    // @ts-expect-error
    status: "some_invalid_status"
  })

  const error = await t.throwsAsync(trap, {instanceOf: TRPCError}) as TRPCError

  const {errors} = error.cause as ZodError
  const [actual] = errors

  t.is(actual.code, "invalid_enum_value")
})
