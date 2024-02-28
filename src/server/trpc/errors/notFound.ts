import {TRPCError} from "@trpc/server"

export function notFound(): never {
  throw new TRPCError({code: "NOT_FOUND"})
}
