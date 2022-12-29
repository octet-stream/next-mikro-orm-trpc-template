import {RequestContext} from "@mikro-orm/core"

import {middleware} from "server/trpc/def"
import {getORM} from "server/lib/db"

/**
 * Add RequestContext for MikroORM to isolate Identity Map per request.
 */
const ormContext = middleware(async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx}))
})

export default ormContext
