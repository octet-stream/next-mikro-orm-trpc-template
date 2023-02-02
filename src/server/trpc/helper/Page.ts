import {MaybeNull} from "lib/type/MaybeNull"
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

export interface IPageOutput<T extends Record<string, unknown>> {
  /**
   * List of current page items.
   */
  items: T[]

  /**
   * Items per page limit.
   */
  limit: number

  /**
   * Max amount of the items for this page type
   */
  maxLimit: MaybeNull<number>

  /**
   * The number of the current page.
   */
  current: number

  /**
   * Next page number.
   * Will be `null` once you reach the last page.
   */
  nextCursor: MaybeNull<number>

  /**
   * Previous page number.
   * Will be `null` once you're on the first page.
   */
  prevCursor: MaybeNull<number>

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

export class Page<T extends Record<string, unknown>> implements IPageOutput<T> {
  readonly #items: T[]

  readonly #current: number

  readonly #limit: number

  readonly #maxLimit: MaybeNull<number>

  readonly #pagesCount: number

  readonly #rowsCount: number

  readonly #itemsCount: number

  readonly #nextCursor: MaybeNull<number>

  readonly #prevCursor: MaybeNull<number>

  constructor({items, count, args}: PageOutputInput<T>) {
    this.#items = items
    this.#rowsCount = count
    this.#current = args.cursor
    this.#limit = args.limit
    this.#maxLimit = args.maxLimit
    this.#itemsCount = items.length
    this.#pagesCount = (args.limit && Math.ceil(count / args.limit)) || 1 // If `args.limit` is present, calculate total pages. Otherwise, return `1`.
    this.#nextCursor = args.getNextCursor(this.pagesCount)
    this.#prevCursor = args.getPrevCursor()
  }

  get items(): T[] {
    return this.#items
  }

  get limit(): number {
    return this.#limit
  }

  get maxLimit(): MaybeNull<number> {
    return this.#maxLimit
  }

  get current(): number {
    return this.#current
  }

  get pagesCount(): number {
    return this.#pagesCount
  }

  get rowsCount(): number {
    return this.#rowsCount
  }

  get itemsCount(): number {
    return this.#itemsCount
  }

  get nextCursor(): MaybeNull<number> {
    return this.#nextCursor
  }

  get prevCursor(): MaybeNull<number> {
    return this.#prevCursor
  }

  toJSON(): IPageOutput<T> {
    return {
      items: this.items,
      limit: this.limit,
      maxLimit: this.maxLimit,
      current: this.current,
      prevCursor: this.prevCursor,
      nextCursor: this.nextCursor,
      pagesCount: this.pagesCount,
      rowsCount: this.rowsCount,
      itemsCount: this.itemsCount
    }
  }
}
