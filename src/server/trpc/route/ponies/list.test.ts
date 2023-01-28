import anyTest from "ava"

import type {TestFn} from "ava"

import {runIsolatied} from "server/lib/db/orm"
import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {getPonies} from "server/__helper__/getPonies"

import {Pony} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(async () => {
  await setup()

  await runIsolatied(async em => {
    const data = await getPonies()

    await em.persistAndFlush(data.map(pony => em.create(Pony, pony)))
  })
})

test.after.always(cleanup)

test("Returns list with maximum records", withTRPC, async (t, trpc) => {
  const page = await trpc.ponies.list()

  t.is(page.rows, 50)
  t.is(page.items.length, 50)
  t.is(page.nextCursor, null)
  t.is(page.prevCursor, null)
  t.is(page.total, 1)
})

test("Follows the limit parameter", withTRPC, async (t, trpc) => {
  const page = await trpc.ponies.list({
    limit: 10,
    cursor: 1
  })

  t.is(page.total, 5)
})

test(
  "Has nextCursor param set to the next page number if there's one",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.ponies.list({
      limit: 10,
      cursor: 1
    })

    t.is(page.nextCursor, 2)
  }
)

test(
  "Has nextCursor param being null if the last page is reached",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.ponies.list({
      limit: 10,
      cursor: 5
    })

    t.is(page.nextCursor, null)
  }
)

test(
  "Has prevCursor param set to the prev page number if there's one",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.ponies.list({
      limit: 10,
      cursor: 2
    })

    t.is(page.prevCursor, 1)
  }
)
