import test from "ava"

import type {ImplementationFn} from "ava"
import {RequestContext} from "@mikro-orm/core"
import type {MikroORM} from "@mikro-orm/core"

import {getORM} from "server/lib/db/orm"

type Args = [orm: MikroORM]

type Implementation = ImplementationFn<Args>

/**
 * Creates a MikroORM connection and runs implementation function within that context.
 */
export const withORM = test.macro(async (t, fn: Implementation) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, async () => fn(t, orm))
})
