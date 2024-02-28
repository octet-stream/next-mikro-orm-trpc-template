import {createCaller as routerCreateCaller} from "../../server/trpc/router"
import type {Caller} from "../../server/trpc/router"

interface CallerImplementation<TResult, TArgs extends readonly unknown[]> {
  (trpc: Caller, ...args: TArgs): TResult
}

interface DecoratedCaller<TResult, TArgs extends readonly unknown[]> {
  (...args: TArgs): TResult
}

/**
 * Wraps a tRPC procedure caller with proper Next.js 13 error handling.
 *
 * Catches `NOT_FOUND` errors and shows 404 page.
 *
 * @param caller A function that executes tRPC query
 */
export function createCaller<TResult, TArgs extends readonly unknown[]>(
  caller: CallerImplementation<TResult, TArgs>
): DecoratedCaller<TResult, TArgs> {
  const trpc = routerCreateCaller({})

  return function decoratedCaller(...args: TArgs): TResult {
    return caller(trpc, ...args)
  }
}
