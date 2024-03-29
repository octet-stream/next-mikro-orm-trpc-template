import {wrap} from "@mikro-orm/core"

import {procedure} from "../../procedures/server"
import {notFound} from "../../errors/notFound"

import {NoteUpdateInput} from "../../types/note/NoteUpdateInput"
import {NoteOutput} from "../../types/note/NoteOutput"

import {Note} from "../../../db/entities"

export const update = procedure
  .input(NoteUpdateInput)
  .output(NoteOutput)
  .mutation(async ({input, ctx}) => {
    const {id, ...fields} = input
    const {orm, res} = ctx

    const note = await orm.em.findOneOrFail(Note, id, {
      failHandler: notFound
    })

    wrap(note).assign(fields)

    await orm.em.flush()

    await Promise.allSettled([
      res.revalidate("/"),
      res.revalidate(`/view/${id}`, {unstable_onlyGenerated: true})
    ])

    return note
  })
