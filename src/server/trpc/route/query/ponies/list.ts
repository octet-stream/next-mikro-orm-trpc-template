import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import {PageInput} from "server/trpc/type/input/PageInput"
import {PonyOutput} from "server/trpc/type/output/PonyOutput"
import {createPageOutput} from "server/trpc/type/output/PageOutput"
import {PageArgs} from "server/trpc/helper/PageArgs"
import {Page} from "server/trpc/helper/Page"
import {getORM} from "server/lib/db"

import {Pony} from "server/db/entity"

const list = router<GlobalContext>()
  .query("list", {
    input: PageInput,

    output: createPageOutput(PonyOutput),

    async resolve({input}) {
      const args = new PageArgs(input)
      const orm = await getORM()

      const [items, rows] = await orm.em.findAndCount(Pony, {}, {
        limit: args.limit,
        offset: args.offset,
        orderBy: {createdAt: "desc"}
      })

      return new Page({items, rows, args})
    }
  })

export default list
