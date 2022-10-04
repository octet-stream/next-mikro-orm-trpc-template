import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import {PonyInput} from "server/trpc/type/input/PonyInput"
import {PonyOutput} from "server/trpc/type/output/PonyOutput"

import {getORM} from "server/lib/db"
import {Pony} from "server/db/entity"

const create = router<GlobalContext>()
  .mutation("create", {
    input: PonyInput,

    output: PonyOutput,

    async resolve({input}) {
      const orm = await getORM()

      const pony = orm.em.create(Pony, input)

      await orm.em.persistAndFlush(pony)

      return pony
    }
  })

export default create
