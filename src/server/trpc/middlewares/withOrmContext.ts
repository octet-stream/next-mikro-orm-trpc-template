import {RequestContext} from "@mikro-orm/core"

import {getORM} from "../../lib/db/orm"
import {middleware} from "../def"

/**
 * Add RequestContext for MikroORM to isolate Identity Map per request.
 */
export const withOrmContext = middleware(async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.create(orm.em, () => next({ctx: {...ctx, orm}}))
})

export default withOrmContext
