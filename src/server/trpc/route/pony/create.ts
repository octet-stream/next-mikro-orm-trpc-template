import {procedure} from "server/trpc/procedure/server"

import {PonyInput} from "server/trpc/type/input/PonyInput"
import {PonyOutput} from "server/trpc/type/output/PonyOutput"

import {getORM} from "server/lib/db"
import {Pony} from "server/db/entity"

const create = procedure
  .input(PonyInput)
  .output(PonyOutput)
  .mutation(async ({input}) => {
    const orm = await getORM()

    const pony = orm.em.create(Pony, input)

    await orm.em.persistAndFlush(pony)

    return pony
  })

export default create
