import type {NextApiRequest, NextApiResponse} from "next"
import type {NextHandler} from "next-connect"

import type {MaybePromise} from "lib/type/MaybePromise"

export interface Middleware {
  (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ): MaybePromise<unknown>
}
