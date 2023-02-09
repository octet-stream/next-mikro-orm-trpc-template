import type {MaybeUndefined} from "lib/type/MaybeUndefined"
import type {MaybeNull} from "lib/type/MaybeNull"

export interface IPageArgs {
  /**
   * The number of the page to navigate to.
   */
  cursor?: number

  /**
   * The items limmit per page.
   */
  limit?: MaybeUndefined<number>

  /**
   * The max limit of the items for this page type.
   *
   * Unlike the others args, this field is borrowed from the `createPageInput()` helper.
   */
  maxLimit?: MaybeNull<number>
}

export class PageArgs implements IPageArgs {
  readonly #cursor: number

  readonly #limit: MaybeUndefined<number>

  readonly #maxLimit: MaybeNull<number>

  readonly #offset: MaybeUndefined<number>

  constructor(input: IPageArgs = {}) {
    let {cursor, limit, maxLimit} = input

    maxLimit ??= null
    cursor ??= 1

    // Defaults to the same value as maxLimit
    if (!limit && maxLimit != null) {
      limit = maxLimit
    }

    this.#limit = limit
    this.#cursor = cursor
    this.#maxLimit = maxLimit
    this.#offset = limit ? limit * (cursor - 1) : undefined
  }

  get offset(): MaybeUndefined<number> {
    return this.#offset
  }

  get cursor(): number {
    return this.#cursor
  }

  get limit(): MaybeUndefined<number> {
    return this.#limit
  }

  get maxLimit(): MaybeNull<number> {
    return this.#maxLimit
  }

  /**
   * Returns the number of the next page.
   * Will return `null` once you reach the last page.
   *
   * @param pages Total amount of pages
   */
  getNextCursor(pages: number): MaybeNull<number> {
    return pages > 1 && this.cursor < pages ? this.cursor + 1 : null
  }

  /**
   * Returns the number of the previous page.
   * Will be `null` once you're on the first page.
   */
  getPrevCursor(): MaybeNull<number> {
    return this.cursor > 1 ? this.cursor - 1 : null
  }
}
