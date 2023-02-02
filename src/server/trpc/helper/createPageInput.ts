import {z} from "zod"

import type {MaybeNull} from "lib/type/MaybeNull"

import {PageArgs} from "server/trpc/helper/PageArgs"

export interface CreatePageInputOptions {
  maxLimit?: MaybeNull<number>
}

const defaults: Required<CreatePageInputOptions> = {
  maxLimit: null
}

/**
 * Creates PageInput type with given `maxLimit` option
 */
export function createPageInput(options: CreatePageInputOptions = {}) {
  const {maxLimit} = {...defaults, ...options}

  const Cursor = z.number().int().positive().optional()
  const LimitBase = z.number().int().positive()

  const Limit = maxLimit ? LimitBase.max(maxLimit).default(maxLimit) : LimitBase

  return z
    .object({cursor: Cursor, limit: Limit.optional()})
    .transform(args => new PageArgs({...args, maxLimit}))
    .default(maxLimit ? {limit: maxLimit} : {})
}

/**
 * Page input type with max `limit` and its default value set to `50`
 */
export const DefaultPageInput = createPageInput({maxLimit: 50})
