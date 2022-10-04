import {router as trpc} from "@trpc/server"

import superjson from "superjson"

import type {GlobalContext} from "server/trpc/context"

export const router = trpc<GlobalContext>()
  .transformer(superjson)

export type Router = typeof router

export type Caller = ReturnType<typeof router.createCaller>
