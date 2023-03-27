import {trpc} from "server/trpc/def"

import {withOrmContext} from "server/trpc/middleware/withOrmContext"

export const procedure = trpc.procedure.use(withOrmContext)

export const baseProcedure = procedure
