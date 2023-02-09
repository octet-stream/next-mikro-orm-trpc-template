import {TRPCError} from "@trpc/server"
import {wrap} from "@mikro-orm/core"

import {procedure} from "server/trpc/procedure/server"

import {NoteUpdateInput} from "server/trpc/type/input/NoteUpdateInput"
import {NoteOutput} from "server/trpc/type/output/NoteOutput"

import {Note} from "server/db/entity"

export const update = procedure
  .input(NoteUpdateInput)
  .output(NoteOutput)
  .mutation(async ({input, ctx}) => {
    const {id, ...fields} = input
    const {orm, res} = ctx

    const note = await orm.em.findOneOrFail(Note, id, {
      failHandler: () => new TRPCError({code: "NOT_FOUND"})
    })

    wrap(note).assign(fields)

    await orm.em.flush()

    await Promise.allSettled([
      res.revalidate("/"),
      res.revalidate(`/view/${id}`, {unstable_onlyGenerated: true})
    ])

    return note
  })
