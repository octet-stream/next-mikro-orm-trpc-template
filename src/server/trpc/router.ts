import {trpc} from "server/trpc/def"

import ponies from "./route/ponies"
import pony from "./route/pony"

export const router = trpc.router({
  ponies,
  pony
})

export type Router = typeof router

export type Caller = ReturnType<typeof router.createCaller>
