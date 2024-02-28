import {trpc} from "../def"

import {withOrmContext} from "../middlewares/withOrmContext"

export const procedure = trpc.procedure.use(withOrmContext)

export const baseProcedure = procedure
