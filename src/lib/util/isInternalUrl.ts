import isAbsolute from "is-absolute-url"

/* c8 ignore next 3 */
const base = typeof window === "undefined"
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : window.location.origin

/**
 * Checks if given url string is external
 *
 * @param url
 */
export const isInternalUrl = (url: string): boolean => (
  isAbsolute(url) ? url.startsWith(new URL(base).origin) : true
)
