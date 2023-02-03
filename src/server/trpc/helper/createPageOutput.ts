/* eslint-disable indent */

import {z, ZodObject, ZodRawShape} from "zod"

import {createPageInput} from "./createPageInput"
import {Page} from "./Page"

/**
 * Creates a `Page<T>` output with the list of items of type `T`
 */
export const createPageOutput = <
  TOutput extends ZodRawShape,
  TInput extends ReturnType<typeof createPageInput>
>(
  output: ZodObject<TOutput>,
  input: TInput
) => z
  .object({
    items: z.array(output),
    count: z.number().int(),
    args: input.transform(({args}) => args)
  })
  .transform(page => new Page(page).toJSON())
