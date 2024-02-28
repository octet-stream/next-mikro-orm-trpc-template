import {procedure} from "../../procedures/server"

import {NoteCreateInput} from "../../types/note/NoteCreateInput"
import {NoteOutput} from "../../types/note/NoteOutput"

import {Note} from "../../../db/entities"

export const create = procedure
  .input(NoteCreateInput)
  .output(NoteOutput)
  .mutation(async ({input, ctx}) => {
    const {orm, res} = ctx

    const note = orm.em.create(Note, input)

    await orm.em.persistAndFlush(note)
    await res.revalidate("/")

    return note
  })
