/* eslint-disable func-names */
/* eslint-disable no-undef, no-restricted-globals */

export const globalObject = (function (): typeof globalThis {
  // new standardized access to the global object
  if (typeof globalThis !== "undefined") {
    return globalThis
  }

  // WebWorker specific access
  if (typeof self !== "undefined") {
    return self
  }

  return window
}())
