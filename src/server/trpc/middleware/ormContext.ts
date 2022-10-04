import type {
  MiddlewareFunction
} from "@trpc/server/dist/declarations/src/internals/middlewares"

import {RequestContext} from "@mikro-orm/core"

import type {GlobalContext} from "server/trpc/context"
import {getORM} from "server/lib/db"

type ORMContext = MiddlewareFunction<GlobalContext, GlobalContext, unknown>

const ormContext: ORMContext = async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx}))
}

export default ormContext
