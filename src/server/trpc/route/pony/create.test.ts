import anyTest from "ava"

import type {TestFn} from "ava"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {PonyRace} from "server/trpc/type/common/PonyRace"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test("Creates a new pony", withTRPC, async (t, trpc) => {
  const actual = await trpc.pony.create({
    name: "Lyra Heartstrings",
    race: PonyRace.UNICORN
  })

  t.is(actual.name, "Lyra Heartstrings")
  t.is(actual.race, PonyRace.UNICORN)
})
