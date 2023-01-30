import {httpBatchLink, createTRPCProxyClient} from "@trpc/client"

import Superjson from "superjson"

import type {Router} from "server/trpc/router"

export const client = createTRPCProxyClient<Router>({
  transformer: Superjson,
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`
    })
  ]
})
