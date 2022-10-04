import type {GetStaticPaths} from "next"

/**
 * Returns empty paths for dynamic route, so that page can be generated on demand.
 *
 * This function also will set `fallback` to `blocking`.
 *
 * To use, expose this function as `getStaticPath` from page module.
 */
export const getEmptyPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking"
})
