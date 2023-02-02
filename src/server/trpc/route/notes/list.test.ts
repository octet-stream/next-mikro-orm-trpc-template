import anyTest from "ava"

import type {TestFn} from "ava"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {runIsolatied} from "server/lib/db/orm"

import {Note} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(async () => {
  await setup()

  await runIsolatied(async em => {
    const notes = Array.from({length: 100}).fill(undefined).map((_, index) => (
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
