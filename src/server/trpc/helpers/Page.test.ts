import test from "ava"

import {NoteStatus} from "server/trpc/types/common/NoteStatus"

import {PageArgs} from "./PageArgs"
import {Page} from "./Page"

type Note = {
  id: string
  title: string
  status: NoteStatus
}

const data: Note[] = Array.from({length: 100}).fill({}).map((_, i) => ({
  id: `${i + 1}`,
  title: `Test note #${i + 1}`,
  status: NoteStatus.INCOMPLETED
}))

test("Creates a page with default params", t => {
  const args = new PageArgs()
  const actual = new Page<Note>({args, count: 0, items: []})

  t.is(actual.current, args.cursor)
  t.is(actual.maxLimit, args.maxLimit)
  t.is(actual.limit, args.limit ?? null)
  t.is(actual.itemsCount, 0)
  t.is(actual.nextCursor, args.getNextCursor(actual.pagesCount))
  t.is(actual.prevCursor, args.getPrevCursor())
  t.is(actual.rowsCount, 0)
  t.is(actual.pagesCount, 1)
  t.deepEqual(actual.items, [])
})

test("Creates a page with values according to given data input", t => {
  const args = new PageArgs()
  const actual = new Page({args, count: data.length, items: data})

  t.deepEqual(actual.items, data)
  t.is(actual.rowsCount, data.length)
  t.is(actual.pagesCount, 1)
})

test(".pagesCount has a value according to PageArgs.limit", t => {
  const args = new PageArgs({limit: 50})
  const actual = new Page({args, count: data.length, items: data})

  t.is(actual.pagesCount, 2)
})

test("Always rounds .pagesCount to the greater integer", t => {
  const notes: Note[] = [
    ...data,

    {
      id: `${data.length + 1}`,
      title: `Test note ${data.length + 1}`,
      status: NoteStatus.INCOMPLETED
    } as Note
  ]

  const args = new PageArgs({limit: 50})
  const actual = new Page({args, count: notes.length, items: notes})

  t.is(actual.pagesCount, 3)
})

test(".nextCursor has a value according to Page.pagesCount", t => {
  const args = new PageArgs({limit: 50})
  const actual = new Page({args, count: data.length, items: data})

  t.is(actual.nextCursor, args.getNextCursor(actual.pagesCount))
})
