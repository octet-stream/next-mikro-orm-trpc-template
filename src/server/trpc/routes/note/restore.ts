import {NoteStatusFilter} from "../../types/common/NoteStatusFilter"
import {NoteStatus} from "../../types/common/NoteStatus"
import {NoteOutput} from "../../types/note/NoteOutput"
import {procedure} from "../../procedures/server"
import {notFound} from "../../errors/notFound"
import {Node} from "../../types/common/Node"

import {Note} from "../../../db/entity"

export const restore = procedure
  .input(Node)
  .output(NoteOutput)
  .mutation(async ({input, ctx}) => {
    const {orm, res} = ctx

    const note = await orm.em.findOneOrFail(Note, input.id, {
      filters: {
        [NoteStatusFilter.REJECTED]: true,
        [NoteStatusFilter.ALL]: false
      },

      failHandler: notFound
    })

    note.status = NoteStatus.INCOMPLETED

    await orm.em.flush()
    await Promise.allSettled([
      res.revalidate("/"),
      res.revalidate(`/view/${note.id}`, {unstable_onlyGenerated: true})
    ])

    return note
  })
