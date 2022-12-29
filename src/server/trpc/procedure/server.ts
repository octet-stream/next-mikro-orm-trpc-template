import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

import {baseProcedure} from "./base"

/**
 * Procedure builder for server-side usage only.
 * Adds middleware with server-side context check.
 */
export const procedure = baseProcedure.use(ssrContextCheck)

export const ssrProcedure = procedure
