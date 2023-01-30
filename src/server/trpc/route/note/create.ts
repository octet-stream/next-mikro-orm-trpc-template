import {procedure} from "server/trpc/procedure/server"

import {NoteCreateInput} from "server/trpc/type/input/NoteCreateInput"
import {NoteOutput} from "server/trpc/type/output/NoteOutput"

import {Note} from "server/db/entity"

export const create = procedure
  .input(NoteCreateInput)
  .output(NoteOutput)
  .mutation(async ({input, ctx}) => {
    const {orm} = ctx

    const note = orm.em.create(Note, input)

    await orm.em.persistAndFlush(note)

    return note
  })
