import {TRPCError} from "@trpc/server"

import {procedure} from "server/trpc/procedure/base"

import {Node} from "server/trpc/type/common/Node"
import {NoteOutput} from "server/trpc/type/output/NoteOutput"

import {Note} from "server/db/entity"

export const getById = procedure
  .input(Node)
  .output(NoteOutput)
  .query(async ({input, ctx}) => {
    const {orm} = ctx

    return orm.em.findOneOrFail(Note, input.id, {
      failHandler: () => new TRPCError({code: "NOT_FOUND"})
    })
  })
