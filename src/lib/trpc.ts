import {createReactQueryHooks} from "@trpc/react"

import superjson from "superjson"

import type {Router} from "server/trpc/router"

const {Provider, createClient, ...trpc} = createReactQueryHooks<Router>()

export const client = createClient({
  url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
  transformer: superjson
})

export const trpcClient = client
export const TRPCProvider = Provider
export const hooks = trpc

export const {useQuery, useMutation, useInfiniteQuery, useSubscription} = trpc
