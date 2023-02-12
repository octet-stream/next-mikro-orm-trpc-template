import anyTest from "ava"

import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"
import {Note} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test("Restores a note", withTRPC, async (t, trpc, orm) => {
  const note = orm.em.create(Note, {
    title: "Test note #1",
    status: NoteStatus.REJECTED
  })

  await orm.em.persistAndFlush(note)

  const {id, status} = await trpc.note.restore({id: note.id})

  t.is(id, note.id)
  t.is(status, NoteStatus.INCOMPLETED)
})

test(
  "Throws an error attempting to restore nonexistent note",

  withTRPC,

  async (t, trpc) => {
    const error = await t.throwsAsync(
      trpc.note.restore({id: "this_note_does_not_exist"}),

      {
        instanceOf: TRPCError
      }
    )

    if (!error) {
      return t.fail()
    }

    t.is(error.code, "NOT_FOUND")
  }
)
