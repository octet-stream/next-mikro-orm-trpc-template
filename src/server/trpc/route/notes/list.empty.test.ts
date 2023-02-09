import anyTest from "ava"

import type {TestFn} from "ava"
import {isEmpty} from "lodash"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after(cleanup)

test("Returns empty page", withTRPC, async (t, trpc) => {
  const page = await trpc.notes.list()

  t.is(page.itemsCount, 0)
  t.true(isEmpty(page.items))
  t.is(page.pagesCount, 1)
  t.is(page.prevCursor, null)
  t.is(page.nextCursor, null)
})
