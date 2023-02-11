import test from "ava"

import type {ZodInvalidTypeIssue} from "zod"
import {nanoid} from "nanoid/async"
import {ZodError} from "zod"

import {Record} from "./Record"
import type {TRecord} from "./Record"

test("Validates correct record input", async t => {
  const now = new Date()

  const expected: TRecord = {
    id: await nanoid(),
    createdAt: now,
    updatedAt: now
  }

  const actual = await Record.parseAsync(expected)

  t.is(actual.id, expected.id)
  t.is(Number(actual.createdAt), Number(expected.createdAt))
  t.is(Number(actual.updatedAt), Number(expected.updatedAt))
})

test("Fails with incorrect input type", async t => {
  const error = await t.throwsAsync(
    Record.parseAsync("invalid_type"),

    {
      instanceOf: ZodError
    }
  )

  if (!error) {
    return t.fail()
  }

  const [{code, expected, received}] = error.issues as ZodInvalidTypeIssue[]

  t.is(code, "invalid_type")
  t.is(expected, "object")
  t.is(received, "string")
})
