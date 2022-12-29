import {trpc} from "server/trpc/def"

import ormContext from "server/trpc/middleware/ormContext"

export const procedure = trpc.procedure.use(ormContext)

export const baseProcedure = procedure
