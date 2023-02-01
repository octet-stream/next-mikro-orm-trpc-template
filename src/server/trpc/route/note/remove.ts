import {TRPCError} from "@trpc/server"

import {procedure} from "server/trpc/procedure/server"

import {RemoveOutput} from "server/trpc/type/output/RemoveOutput"
import {Node} from "server/trpc/type/common/Node"

import {Note} from "server/db/entity/Note"

export const remove = procedure
  .input(Node)
  .output(RemoveOutput)
  .mutation(async ({input, ctx}) => {
    const {orm} = ctx

    const note = await orm.em.findOneOrFail(Note, input.id, {
      filters: {active: false},
      failHandler: () => new TRPCError({code: "NOT_FOUND"})
    })

    await orm.em.removeAndFlush(note)

    return {id: input.id}
  })
