import type {IPageOutput} from "server/trpc/helper/createPageOutput"

import {PageArgs} from "./PageArgs"

export interface PageOutputInput<T extends Record<string, unknown>> {
  /**
   * List of current page items
   */
  items: T[]

  /**
   * An amount of total rows in a table
   */
  count: number

  /**
   * Instance of `PageArgs` class
   */
  args: PageArgs
}

export class Page<T extends Record<string, unknown>> implements IPageOutput<T> {
  readonly #items: T[]

  readonly #pagesCount: number

  readonly #rowsCount: number

  readonly #itemsCount: number

  readonly #nextCursor: number | null

  readonly #prevCursor: number | null

  constructor({items, count, args}: PageOutputInput<T>) {
    this.#items = items
    this.#rowsCount = count
    this.#itemsCount = items.length
    this.#pagesCount = (args.limit && Math.ceil(count / args.limit)) || 1 // If `args.limit` is present, calculate total pages. Otherwise, return `1`.
    this.#nextCursor = args.getNextCursor(this.pagesCount)
    this.#prevCursor = args.getPrevCursor()
  }

  /**
   * List of current page items
   */
  get items(): T[] {
    return this.#items
  }

  /**
   * Total number of pages. Will always be `1` when the `limit` is `undefined`.
   */
  get pagesCount(): number {
    return this.#pagesCount
  }

  /**
   * Total amount of rows in table
   */
  get rowsCount(): number {
    return this.#rowsCount
  }

  /**
   * Total amount of items in the list
   */
  get itemsCount(): number {
    return this.#itemsCount
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

  toJSON(): IPageOutput<T> {
    return {
      prevCursor: this.prevCursor,
      nextCursor: this.nextCursor,
      items: this.items,
      pagesCount: this.pagesCount,
      rowsCount: this.rowsCount,
      itemsCount: this.itemsCount
    }
  }
}
