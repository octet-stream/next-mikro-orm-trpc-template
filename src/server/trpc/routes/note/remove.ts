import {procedure} from "../../procedures/server"

import {notFound} from "../../errors/notFound"
import {RemoveOutput} from "../../types/note/RemoveOutput"
import {NoteRemoveInput} from "../../types/note/NoteRemoveInput"
import {NoteStatus} from "../../types/common/NoteStatus"

import {Note} from "../../../db/entities"

export const remove = procedure
  .input(NoteRemoveInput)
  .output(RemoveOutput)
  .mutation(async ({input, ctx}) => {
    const {id, soft} = input
    const {orm, res} = ctx

    const note = await orm.em.findOneOrFail(Note, input.id, {
      filters: false,

      failHandler: notFound
    })

    if (soft) {
      note.status = NoteStatus.REJECTED
    } else {
      orm.em.remove(note)
    }

    await orm.em.flush()
    await Promise.allSettled([
      res.revalidate("/"),
      res.revalidate(`/view/${id}`, {unstable_onlyGenerated: true})
    ])

    return {id, soft}
  })
