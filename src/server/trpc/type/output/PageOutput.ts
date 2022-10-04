import {z, ZodType} from "zod"

export interface IPageOutput<T> {
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
   * Total amount of rows in table
   */
  rows: number

  /**
   * Total number of pages. Will always be `1` when the `limit` is `undefined`.
   */
  total: number
}

/**
 * Creates a `Page<T>` output with the list of items is instance of `T`
 */
export const createPageOutput = <T>(t: ZodType<T>) => z.object({
  /**
   * List of current page items
   */
  items: z.array(t),

  /**
   * Next page number.
   * Will be `null` once you reach the last page.
   */
  nextCursor: z.number().int().nonnegative().nullable(),

  /**
   * Previous page number.
   * Will be `null` once you're on the first page.
   */
  prevCursor: z.number().int().nonnegative().nullable(),

  /**
   * Total amount of rows in table
   */
  rows: z.number().int().nonnegative(),

  /**
   * Total number of pages. Will always be `1` when the `limit` is `undefined`.
   */
  total: z.number().int().nonnegative()
})
