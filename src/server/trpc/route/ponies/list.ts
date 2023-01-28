import {procedure} from "server/trpc/procedure/base"

import {PageInput} from "server/trpc/type/input/PageInput"
import {PoniesPageOutput} from "server/trpc/type/output/PoniesPageOutput"
import {PageArgs} from "server/trpc/helper/PageArgs"
import {Page} from "server/trpc/helper/Page"

import {Pony} from "server/db/entity"

const list = procedure
  .input(PageInput)
  .output(PoniesPageOutput)
  .query(async ({input, ctx}) => {
    const args = new PageArgs(input)
    const {orm} = ctx

    const [items, rows] = await orm.em.findAndCount(Pony, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {createdAt: "desc"}
    })

    return new Page({items, rows, args})
  })

export default list
