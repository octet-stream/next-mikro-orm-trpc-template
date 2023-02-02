import {omitBy, isNil} from "lodash"

import type {MaybeNull} from "lib/type/MaybeNull"
import type {MaybeUndefined} from "lib/type/MaybeUndefined"

export interface IPageArgs {
  /**
   * The number of the page to navigate to.
   */
  cursor?: number

  /**
   * The items limmit per page.
   */
  limit?: MaybeNull<number>

  /**
   * The max limit of the items for this page type.
   *
   * Unlike the others args, this field is borrowed from the `createPageInput()` helper.
   */
  maxLimit: MaybeNull<number>
}

const defaults: Required<IPageArgs> = {
  cursor: 1,
  limit: null,
  maxLimit: null
}

export class PageArgs implements IPageArgs {
  readonly #cursor: number

  readonly #limit: MaybeNull<number>

  readonly #offset: MaybeUndefined<number>

  readonly #maxLimit: MaybeNull<number>

  constructor(input: IPageArgs) {
    const {cursor, limit, maxLimit} = {
      ...defaults, ...omitBy<IPageArgs>(input, isNil)
    }

    this.#limit = limit ?? maxLimit // Defaults to the same value as maxLimit
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

  get limit(): MaybeNull<number> {
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
