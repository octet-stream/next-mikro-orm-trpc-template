import {procedure} from "server/trpc/procedure/base"

import {NotesPageInput} from "server/trpc/type/input/NotesPageInput"
import {NotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

import {Note} from "server/db/entity/Note"

export const list = procedure
  .input(NotesPageInput)
  .output(NotesPageOutput)
  .query(async ({input: args, ctx}) => {
    const {orm} = ctx

    const [items, count] = await orm.em.findAndCount(Note, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {createdAt: "desc"}
    })

    return {items, count, args}
  })
