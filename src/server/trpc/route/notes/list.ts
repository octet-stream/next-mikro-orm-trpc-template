import {procedure} from "server/trpc/procedure/base"

import {NotesPageInput} from "server/trpc/type/input/NotesPageInput"
import {NotesPageOutput} from "server/trpc/type/output/NotesPageOutput"
import {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"

import {Note} from "server/db/entity/Note"

export const list = procedure
  .input(NotesPageInput)
  .output(NotesPageOutput)
  .query(async ({input, ctx}) => {
    const {orm} = ctx
    const {status} = input.filter

    const [items, count] = await orm.em.findAndCount(Note, {}, {
      limit: input.limit,
      offset: input.offset,
      orderBy: {createdAt: "desc"},
      filters: {
        [NoteStatusFilter.ALL]: (!status || status === NoteStatusFilter.ALL),
        [NoteStatusFilter.ACTIVE]: status === NoteStatusFilter.ACTIVE,
        [NoteStatusFilter.COMPLETED]: status === NoteStatusFilter.COMPLETED,
        [NoteStatusFilter.REJECTED]: status === NoteStatusFilter.REJECTED,
      }
    })

    return {items, count, args: input}
  })
