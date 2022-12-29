import {httpBatchLink, createTRPCProxyClient} from "@trpc/client"

import superjson from "superjson"

import type {Router} from "server/trpc/router"

export const client = createTRPCProxyClient<Router>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`
    })
  ]
})
