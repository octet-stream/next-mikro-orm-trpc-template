import {procedure} from "../../procedures/base"

import {withPageAssert} from "../../middlewares/withPageAssert"

import {NotesPageInput} from "../../types/note/NotesPageInput"
import {NotesPageOutput} from "../../types/note/NotesPageOutput"
import {NoteStatusFilter} from "../../types/common/NoteStatusFilter"

import {Note} from "../../../db/entity/Note"

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
