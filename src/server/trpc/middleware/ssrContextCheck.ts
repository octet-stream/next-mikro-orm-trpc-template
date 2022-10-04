import type {
  MiddlewareFunction
} from "@trpc/server/dist/declarations/src/internals/middlewares"
import {TRPCError} from "@trpc/server"

import {isSSRContext} from "server/trpc/context"
import type {GlobalContext, SSRContext} from "server/trpc/context"

type SSRContextCheck = MiddlewareFunction<GlobalContext, SSRContext, unknown>

const ssrContextCheck: SSRContextCheck = ({ctx, next}) => {
  if (!isSSRContext(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "SSRContext required for this operation"
    })
  }

  return next({ctx})
}

export default ssrContextCheck
