import {procedure} from "server/trpc/procedure/base"

import {DefaultPageInput} from "server/trpc/helper/createPageInput"
import {PoniesPageOutput} from "server/trpc/type/output/PoniesPageOutput"

import {Pony} from "server/db/entity"

const list = procedure
  .input(DefaultPageInput)
  .output(PoniesPageOutput)
  .query(async ({input: args, ctx}) => {
    const {orm} = ctx

    const [items, count] = await orm.em.findAndCount(Pony, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {createdAt: "desc"}
    })

    return {items, count, args}
  })

export default list
