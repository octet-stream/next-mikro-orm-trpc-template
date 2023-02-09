import type {CreateNextContextOptions} from "@trpc/server/adapters/next"
import type {NextApiRequest, NextApiResponse} from "next"

export type Context = object

export type SSRContext<R = any> = Context & {
  req: NextApiRequest
  res: NextApiResponse<R>
}

export type GlobalContext = Context | SSRContext

export function isSSRContext(
  ctx: GlobalContext
): ctx is SSRContext {
  return !!((ctx as SSRContext)?.req && (ctx as SSRContext)?.res)
}

export const createContext = (
  ctx: CreateNextContextOptions
): GlobalContext => isSSRContext(ctx) ? ctx : {}
