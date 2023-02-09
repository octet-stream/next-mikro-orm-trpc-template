import anyTest from "ava"

import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {Note} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test("Removes note by id", withTRPC, async (t, trpc, orm) => {
  const note = orm.em.create(Note, {title: "Test note #1"})

  await orm.em.persistAndFlush(note)

  const actual = await trpc.note.remove({id: note.id})

  t.is(actual.id, note.id)
  t.false(actual.soft, "Hard removes a row by default")
  t.true(actual.success)

  await t.throwsAsync(orm.em.findOneOrFail(Note, actual.id))
})

test("Fails to remove unexistent note", withTRPC, async (t, trpc) => {
  await t.throwsAsync<TRPCError>(
    trpc.note.remove({id: "unknown_note_id"}),

    {
      instanceOf: TRPCError,
      code: "NOT_FOUND" as TRPCError["code"]
    }
  )
})
