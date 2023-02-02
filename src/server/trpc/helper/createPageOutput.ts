/* eslint-disable indent */

import {z, ZodObject, ZodRawShape} from "zod"

import {createPageInput} from "./createPageInput"
import type {CreatePageInputOptions} from "./createPageInput"
import {Page} from "./Page"

/**
 * Creates a `Page<T>` output with the list of items of type `T`
 */
export const createPageOutput = <TOutput extends ZodRawShape>(
  output: ZodObject<TOutput>,
  options?: CreatePageInputOptions
) => z
  .object({
    items: z.array(output),
    count: z.number().int(),
    args: createPageInput(options)
  })
  .transform(page => new Page(page).toJSON())
