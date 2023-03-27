import {RequestContext} from "@mikro-orm/core"

import {middleware} from "server/trpc/def"
import {getORM} from "server/lib/db/orm"

/**
 * Add RequestContext for MikroORM to isolate Identity Map per request.
 */
export const withOrmContext = middleware(async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx: {...ctx, orm}}))
})

export default withOrmContext
