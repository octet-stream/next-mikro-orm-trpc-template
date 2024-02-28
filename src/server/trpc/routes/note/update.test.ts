import anyTest from "ava"

import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"

import {withTRPC} from "../../../__macros__/withTRPC"
import {setup, cleanup} from "../../../__helpers__/database"
import type {WithTRPCContext} from "../../../__macros__/withTRPC"

import {NoteStatus} from "../../types/common/NoteStatus"
import {Note} from "../../../db/entities"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test("Updated existent note", withTRPC, async (t, trpc, orm) => {
  const note = orm.em.create(Note, {title: "Test note #1"})

  await orm.em.persistAndFlush(note)

  const actual = await trpc.note.update({
    id: note.id,
    title: "Updated note #1",
    status: NoteStatus.COMPLETED,
    details: "Updated details for note #1"
  })

  t.is(actual.title, "Updated note #1")
  t.is(actual.status, NoteStatus.COMPLETED)
  t.is(actual.details, "Updated details for note #1")
})

test("Fails to update unexistent note", withTRPC, async (t, trpc) => {
  await t.throwsAsync(
    trpc.note.update(
      {
        id: "some_unknown_id",
        title: "Updated note #2"
      }
    ),

    {
      instanceOf: TRPCError,
      code: "NOT_FOUND" as TRPCError["code"]
    }
  )
})
