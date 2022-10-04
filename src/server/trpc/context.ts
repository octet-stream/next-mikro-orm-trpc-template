import type {CreateNextContextOptions} from "@trpc/server/adapters/next"
import type {NextApiRequest, NextApiResponse} from "next"

export interface Context { }

export interface SSRContext<R = any> extends Context {
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
