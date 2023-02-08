import {TRPCError} from "@trpc/server"

import {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"
import {NoteStatus} from "server/trpc/type/common/NoteStatus"
import {NoteOutput} from "server/trpc/type/output/NoteOutput"
import {procedure} from "server/trpc/procedure/server"
import {Node} from "server/trpc/type/common/Node"

import {Note} from "server/db/entity"

export const restore = procedure
  .input(Node)
  .output(NoteOutput)
  .mutation(async ({input, ctx}) => {
    const {orm} = ctx

    const note = await orm.em.findOneOrFail(Note, input.id, {
      filters: {
        [NoteStatusFilter.REJECTED]: true,
        [NoteStatusFilter.ALL]: false
      },

      failHandler: () => new TRPCError({code: "NOT_FOUND"})
    })

    note.status = NoteStatus.INCOMPLETED

    await orm.em.flush()

    return note
  })
