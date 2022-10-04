import {router as trpc} from "@trpc/server"

import superjson from "superjson"

import type {GlobalContext} from "server/trpc/context"

import ormContext from "server/trpc/middleware/ormContext"

import query from "server/trpc/route/query"
import mutation from "server/trpc/route/mutation"

export const router = trpc<GlobalContext>()
  .transformer(superjson)
  .middleware(ormContext)
  .merge(query)
  .merge(mutation)

export type Router = typeof router

export type Caller = ReturnType<typeof router.createCaller>
