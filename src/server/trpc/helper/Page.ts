import type {IPageOutput} from "server/trpc/type/output/PageOutput"
import type {FilterEntity} from "server/lib/type/FilterEntity"

import {PageArgs} from "./PageArgs"

export interface PageOutputInput<T> {
  /**
   * List of current page items
   */
  items: FilterEntity<T>[]

  /**
   * An amount of total rows in a table
   */
  rows: number

  /**
   * Instance of `PageArgs` class
   */
  args: PageArgs
}

export class Page<T> implements IPageOutput<T> {
  readonly #items: FilterEntity<T>[]

  readonly #total: number

  readonly #rows: number

  readonly #nextCursor: number | null

  readonly #prevCursor: number | null

  constructor({items, rows, args}: PageOutputInput<T>) {
    this.#items = items
    this.#rows = rows
    this.#total = (args.limit && Math.ceil(rows / args.limit)) || 1 // If `args.limit` is present, calculate total pages. Otherwise, return `1`.
    this.#nextCursor = args.getNextCursor(this.total)
    this.#prevCursor = args.getPrevCursor()
  }

  /**
   * List of current page items
   */
  get items(): FilterEntity<T>[] {
    return this.#items
  }

  /**
   * Total number of pages. Will always be `1` when the `limit` is `undefined`.
   */
  get total(): number {
    return this.#total
  }

  /**
   * Total amount of rows in table
   */
  get rows(): number {
    return this.#rows
  }

  /**
   * Next page number.
   * Will be `null` once you reach the last page.
   */
  get nextCursor(): number | null {
    return this.#nextCursor
  }

  /**
   * Previous page number.
   * Will be `null` once you're on the first page.
   */
  get prevCursor(): number | null {
    return this.#prevCursor
  }

  toJSON() {
    return {
      prevCursor: this.prevCursor,
      nextCursor: this.nextCursor,
      items: this.items,
      total: this.total,
      rows: this.rows
    }
  }
}
