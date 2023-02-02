import test from "ava"

import {PageArgs} from "./PageArgs"

test("Creates args with default values", t => {
  const actual = new PageArgs()

  t.is(actual.cursor, 1)
  t.is(actual.maxLimit, null)
  t.is(actual.limit, undefined)
  t.is(actual.offset, undefined)
})

test(".limit has the same value as the input", t => {
  const expected = 42
  const actual = new PageArgs({limit: expected})

  t.is(actual.limit, expected)
})

test(".cursor has the same value as the input", t => {
  const expected = 451
  const actual = new PageArgs({cursor: expected})

  t.is(actual.cursor, expected)
})

test(".maxLimit has the same value as the input", t => {
  const expected = 1024
  const actual = new PageArgs({maxLimit: expected})

  t.is(actual.maxLimit, expected)
})

test(".offset has a value depending on cursor and limit", t => {
  const cursor = 1
  const limit = 50
  const expected = limit * (cursor - 1)
  const actual = new PageArgs({cursor, limit})

  t.is(actual.offset, expected)
})

test(".getNextCursor() always returns null for default args", t => {
  const actual = new PageArgs()

  t.is(actual.getNextCursor(1), null)
})

test(
  ".getNextCursor() returns next page number according to the current",

  t => {
    const actual = new PageArgs({cursor: 41})

    t.is(actual.getNextCursor(100), 42)
  }
)

test(
  ".getNextCursor() returns null if current cursor is greater then "
    + "the pages number argument",

  t => {
    const actual = new PageArgs({cursor: 42})

    t.is(actual.getNextCursor(1), null)
  }
)

test(".getPrevCursor() returns the page number according to the current", t => {
  const actual = new PageArgs({cursor: 2})

  t.is(actual.getPrevCursor(), 1)
})

test(".getPrevCursor() returns null if input.cursor is 1", t => {
  const actual = new PageArgs({cursor: 1})

  t.is(actual.getPrevCursor(), null)
})
