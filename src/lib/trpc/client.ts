import {httpBatchLink, createTRPCProxyClient} from "@trpc/client"

import Superjson from "superjson"

import {serverAddress} from "../utils/serverAddress"

import type {Router} from "../../server/trpc/router"

export const client = createTRPCProxyClient<Router>({
  transformer: Superjson,
  links: [
    httpBatchLink({
      url: new URL("/api/trpc", serverAddress).href
    })
  ]
})
