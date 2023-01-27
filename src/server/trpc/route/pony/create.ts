import {procedure} from "server/trpc/procedure/server"

import {PonyInput} from "server/trpc/type/input/PonyInput"
import {PonyOutput} from "server/trpc/type/output/PonyOutput"

import {getORM} from "server/lib/db"
import {Pony} from "server/db/entity"

const create = procedure
  .input(PonyInput)
  .output(PonyOutput)
  .mutation(async ({input, ctx}) => {
    const orm = await getORM()

    // const pony = orm.em.create(Pony, input)
    const pony = new Pony(input) // <- Issue appears here if you try and create new pony on the `/new` page

    await orm.em.persistAndFlush(pony)
    await ctx.res.revalidate("/")

    return pony
  })

export default create
