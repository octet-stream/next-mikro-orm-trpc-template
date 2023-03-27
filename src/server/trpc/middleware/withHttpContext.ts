import {TRPCError} from "@trpc/server"

import {isSSRContext} from "server/trpc/context"
import {middleware} from "server/trpc/def"

/**
 * Checks whether SSRContext is present. Throws an error if is not. Narrows GlobalContext to SSRContext type.
 */
export const withHttpContext = middleware(({ctx, next}) => {
  if (!isSSRContext(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "SSRContext required for this operation"
    })
  }

  return next({ctx})
})
