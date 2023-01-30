import {TRPCError} from "@trpc/server"

import {procedure} from "server/trpc/procedure/server"

import {Node} from "server/trpc/type/common/Node"
import {RemoveOutput} from "server/trpc/type/output/RemoveOutput"

import {Note} from "server/db/entity/Note"

export const remove = procedure
  .input(Node)
  .output(RemoveOutput)
  .mutation(async ({input, ctx}) => {
    const {orm} = ctx

    const note = await orm.em.findOne(Note, input.id)

    if (!note) {
      throw new TRPCError({code: "BAD_REQUEST"})
    }

    await orm.em.removeAndFlush(note)

    return {id: input.id}
  })
