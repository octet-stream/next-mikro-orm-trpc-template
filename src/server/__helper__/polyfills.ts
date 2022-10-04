/* eslint-disable no-undef */

if (typeof Headers !== "function") {
  // @ts-expect-error Add this just to fix next-auth errors
  globalThis.Headers = class Headers { }
}

export {}
