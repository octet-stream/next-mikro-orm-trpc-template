import {z} from "zod"

import {PageArgs} from "server/trpc/helper/PageArgs"

interface CreatePageInputOptions {
  maxLimit?: number
}

/**
 * Creates PageInput type with given `maxLimit` option
 */
export function createPageInput({maxLimit}: CreatePageInputOptions = {}) {
  const Cursor = z.number().int().positive().optional()
  const LimitBase = z.number().int().positive()

  const Limit = maxLimit ? LimitBase.max(maxLimit).default(maxLimit) : LimitBase

  return z
    .object({cursor: Cursor, limit: Limit.optional()})
    .transform(args => new PageArgs(args))
    .default(maxLimit ? {limit: maxLimit} : {})
}

/**
 * Page input type with max `limit` and its default value set to `50`
 */
export const DefaultPageInput = createPageInput({maxLimit: 50})

export interface IPageInput {
  cursor?: number
  limit?: number
}
