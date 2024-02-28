import {procedure} from "../../procedures/base"

import {NoteOutput} from "../../types/note/NoteOutput"
import {notFound} from "../../errors/notFound"
import {Node} from "../../types/common/Node"

import {Note} from "../../../db/entity"

export const getById = procedure
  .input(Node)
  .output(NoteOutput)
  .query(async ({input, ctx}) => {
    const {orm} = ctx

    return orm.em.findOneOrFail(Note, input.id, {
      filters: false,

      failHandler: notFound
    })
  })
