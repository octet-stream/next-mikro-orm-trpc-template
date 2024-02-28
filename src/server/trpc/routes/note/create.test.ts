import anyTest from "ava"

import {ZodError} from "zod"
import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"

import {withTRPC} from "../../../__macros__/withTRPC"
import {setup, cleanup} from "../../../__helpers__/database"
import type {WithTRPCContext} from "../../../__macros__/withTRPC"

import {NoteStatus} from "../../types/common/NoteStatus"

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

test("Fails creating a note with unknown status", withTRPC, async (t, trpc) => {
  const trap = () => trpc.note.create({
    title: "Test note #3",

    // @ts-expect-error
    status: "some_invalid_status"
  })

  const error = await t.throwsAsync(trap, {instanceOf: TRPCError})

  if (!error) {
    return t.fail()
  }

  const {errors} = error.cause as ZodError
  const [actual] = errors

  t.is(actual.code, "invalid_enum_value")
})
