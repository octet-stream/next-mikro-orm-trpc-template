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

test("Finds a note by given ID", withTRPC, async (t, trpc, orm) => {
  const note = orm.em.create(Note, {title: "Test note"})

  await orm.em.persistAndFlush(note)

  await t.notThrowsAsync(trpc.note.getById({id: note.id}))
})

test(
  "Throws an error when trying to access unknown note",

  withTRPC,

  async (t, trpc) => {
    await t.throwsAsync(trpc.note.getById({id: "some_unknown_id"}), {
      instanceOf: TRPCError,
      code: "NOT_FOUND"
    })
  }
)
