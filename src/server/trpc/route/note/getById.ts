import {procedure} from "server/trpc/procedure/base"

import {NoteOutput} from "server/trpc/type/output/NoteOutput"
import {notFound} from "server/trpc/error/notFound"
import {Node} from "server/trpc/type/common/Node"

import {Note} from "server/db/entity"

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
