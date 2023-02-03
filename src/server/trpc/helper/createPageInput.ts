import type {ZodObject, infer as Infer} from "zod"
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
export function createPageInput<T extends {}>(
  options?: CreatePageInputOptions,
  extensions?: ZodObject<T>
) {
  const {maxLimit} = {...defaults, ...options}

  const Cursor = z.number().int().positive().optional()
  const LimitBase = z.number().int().positive()

  const Limit = maxLimit ? LimitBase.max(maxLimit).default(maxLimit) : LimitBase

  const PageBaseInput = z
    .object({cursor: Cursor, limit: Limit.optional()})
    .default(maxLimit ? {limit: maxLimit} : {})

  const PageInput = extensions
    ? z.intersection(extensions, PageBaseInput)
    : PageBaseInput

  return PageInput.transform(({cursor, limit, ...rest}) => ({
    ...rest as Infer<ZodObject<T>>,

    args: new PageArgs({cursor, limit, maxLimit})
  }))
}

/**
 * Page input type with max `limit` and its default value set to `50`
 */
export const DefaultPageInput = createPageInput({maxLimit: 50})
