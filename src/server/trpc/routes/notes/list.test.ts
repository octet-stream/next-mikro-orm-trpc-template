import anyTest from "ava"

import type {TestFn} from "ava"

import {withTRPC} from "../../../__macros__/withTRPC"
import {setup, cleanup} from "../../../__helpers__/database"
import type {WithTRPCContext} from "../../../__macros__/withTRPC"

import {runIsolatied} from "../../../lib/db/orm"

import {Note} from "../../../db/entities"

const test = anyTest as TestFn<WithTRPCContext>

test.before(async () => {
  await setup()

  await runIsolatied(async em => {
    const notes = Array.from({length: 100}).fill({}).map((_, index) => (
      em.create(Note, {title: `Test note #${index}`})
    ))

    await em.persistAndFlush(notes)
  })
})

test.after.always(cleanup)

test("Returns a page of notes w/o args", withTRPC, async (t, trpc) => {
  const page = await trpc.notes.list()

  t.is(page.itemsCount, 100)
  t.is(page.prevCursor, null)
  t.is(page.nextCursor, null)
  t.true(Array.isArray(page.items))
})

test("Respects given limit", withTRPC, async (t, trpc) => {
  const page = await trpc.notes.list({limit: 50})

  t.is(page.itemsCount, 50)
  t.is(page.limit, 50)
})
