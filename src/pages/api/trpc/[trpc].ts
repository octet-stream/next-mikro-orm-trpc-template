import {createNextApiHandler} from "@trpc/server/adapters/next"

import {createContext} from "../../../server/trpc/context"
import {router} from "../../../server/trpc/router"

export default createNextApiHandler({router, createContext})
