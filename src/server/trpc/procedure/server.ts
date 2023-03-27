import {withHttpContext} from "server/trpc/middleware/withHttpContext"

import {baseProcedure} from "./base"

/**
 * Procedure builder for server-side usage only.
 * Adds middleware with server-side context check.
 */
export const procedure = baseProcedure.use(withHttpContext)

export const ssrProcedure = procedure
