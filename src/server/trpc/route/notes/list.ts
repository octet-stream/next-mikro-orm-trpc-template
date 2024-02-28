import {procedure} from "server/trpc/procedure/base"

import {withPageAssert} from "server/trpc/middleware/withPageAssert"

import {NotesPageInput} from "server/trpc/type/input/NotesPageInput"
import {NotesPageOutput} from "server/trpc/type/output/NotesPageOutput"
import {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"

import {Note} from "server/db/entity/Note"

export const list = procedure
  .use(withPageAssert)
  .input(NotesPageInput)
  .output(NotesPageOutput)
  .query(async ({input, ctx}) => {
    const {orm} = ctx
    const {args} = input
    const {status} = input.filter

    const [items, count] = await orm.em.findAndCount(Note, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {createdAt: "desc"},
      filters: {
        [NoteStatusFilter.ALL]: (!status || status === NoteStatusFilter.ALL),
        [NoteStatusFilter.ACTIVE]: status === NoteStatusFilter.ACTIVE,
        [NoteStatusFilter.COMPLETED]: status === NoteStatusFilter.COMPLETED,
        [NoteStatusFilter.REJECTED]: status === NoteStatusFilter.REJECTED
      }
    })

    return {items, count, args}
  })
