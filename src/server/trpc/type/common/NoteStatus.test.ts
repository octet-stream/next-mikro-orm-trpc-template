import test from "ava"

import {ZodError} from "zod"
import type {ZodInvalidEnumValueIssue} from "zod"

import {NoteStatusSchema, NoteStatus} from "./NoteStatus"

test("Validates note status", async t => {
  const actual = await NoteStatusSchema.parseAsync("completed")

  t.is(actual, NoteStatus.COMPLETED)
})

test("Fails with invalid note status", async t => {
  const input = "totally_unknown_invalid_status_123"

  const error = await t.throwsAsync<ZodError>(
    NoteStatusSchema.parseAsync(input),

    {
      instanceOf: ZodError
    }
  )

  if (!error) {
    return t.fail()
  }

  const [{code, received, options}] = error.issues as ZodInvalidEnumValueIssue[]

  t.is(code, "invalid_enum_value")
  t.is(received, input)
  t.deepEqual(options, Object.values(NoteStatus))
})
