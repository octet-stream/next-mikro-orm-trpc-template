import {procedure} from "server/trpc/procedure/server"

import {PonyInput} from "server/trpc/type/input/PonyInput"
import {PonyOutput} from "server/trpc/type/output/PonyOutput"

import {Pony} from "server/db/entity"

const create = procedure
  .input(PonyInput)
  .output(PonyOutput)
  .mutation(async ({input, ctx}) => {
    const {orm} = ctx

    const pony = orm.em.create(Pony, input)

    await orm.em.persistAndFlush(pony)
    await ctx.res.revalidate("/")

    return pony
  })

export default create
