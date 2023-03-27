/* eslint-disable indent */

import {z} from "zod"
import type {ZodObject, ZodRawShape, input, output} from "zod"

import {createPageInput, DefaultPageInput} from "./createPageInput"
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

export const DefaultPageOutput = createPageOutput(
  z.object({}),

  DefaultPageInput
)

export type IDefaultPageOutput = input<typeof DefaultPageOutput>

export type ODefaultPageOutput = output<typeof DefaultPageOutput>
