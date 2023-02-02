import test from "ava"

import type {ZodInvalidStringIssue} from "zod"
import {nanoid} from "nanoid/async"
import {ZodError} from "zod"

import {Node} from "./Node"

test("Validates correct nanoid string", async t => {
  const expected = await nanoid()
  const actual = await Node.parseAsync({id: expected})

  t.is(actual.id, expected)
})

test("Fails with invalid nanoid string", async t => {
  const input = "You shall not pass!"

  const error = await t.throwsAsync<ZodError>(Node.parseAsync({id: input}), {
    instanceOf: ZodError
  })

  if (!error) {
    return void t.fail()
  }

  const [{code, validation}] = error.issues as ZodInvalidStringIssue[]

  t.is(code, "invalid_string")
  t.is(validation, "regex")
})
