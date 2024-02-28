import type {ParsedUrlQuery} from "querystring"
import type {GetStaticPaths} from "next"

import {getEmptyPaths} from "./getEmptyPaths"

/**
 * Takes `getStaticPaths` implementation, returns `getEmptyPaths` for non-production envs because `getStaticPaths` causes MikroORM initialization on every page.
 */
export const patchStaticPaths = <P extends ParsedUrlQuery = ParsedUrlQuery>(
  fn: GetStaticPaths<P>
): GetStaticPaths<P> => {
  if (process.env.NODE_ENV === "production") {
    return fn
  }

  return getEmptyPaths as GetStaticPaths<P>
}
