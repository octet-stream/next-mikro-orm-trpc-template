import {z, ZodObject, ZodRawShape} from "zod"

import {createPageInput} from "./createPageInput"
import {Page} from "./Page"

export interface IPageOutput<T extends Record<string, unknown>> {
  /**
   * List of current page items
   */
  items: T[]

  /**
   * Next page number.
   * Will be `null` once you reach the last page.
   */
  nextCursor: number | null

  /**
   * Previous page number.
   * Will be `null` once you're on the first page.
   */
  prevCursor: number | null

  /**
   * Total amount of items in the list
   */
  itemsCount: number

  /**
   * Total amount of rows in table
   */
  rowsCount: number

  /**
   * Total number of pages. Will always be `1` when the `limit` is `undefined`.
   */
  pagesCount: number
}

/**
 * Creates a `Page<T>` output with the list of items of type `T`
 */
export const createPageOutput = <T extends ZodRawShape>(t: ZodObject<T>) => z
  .object({
    /**
     * List of current page items
     */
    items: z.array(t),

    count: z.number().int(),

    args: createPageInput()
  })
  .transform(page => new Page(page).toJSON())
