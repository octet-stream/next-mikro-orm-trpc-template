import {omitBy, isNil} from "lodash"

import type {IPageInput} from "server/trpc/type/input/PageInput"

interface IPageArgs extends IPageInput {
  cursor: number
  limit: number
}

export const DEFAULT_PAGE_INPUT: IPageArgs = {
  cursor: 1,
  limit: 50
}

export class PageArgs implements IPageArgs {
  readonly #cursor: number

  readonly #limit: number

  readonly #offset: number | undefined

  constructor(input: IPageInput) {
    const {cursor, limit} = {...DEFAULT_PAGE_INPUT, ...omitBy(input, isNil)}

    this.#cursor = cursor
    this.#limit = limit
    this.#offset = limit ? limit * (cursor - 1) : undefined
  }

  get offset(): number | undefined {
    return this.#offset
  }

  get cursor(): number {
    return this.#cursor
  }

  get limit(): number {
    return this.#limit
  }

  /**
   * Returns the number of the next page.
   * Will return `null` once you reach the last page.
   *
   * @param pages Total amount of pages
   */
  getNextCursor(pages: number): number | null {
    return pages > 1 && this.cursor < pages ? this.cursor + 1 : null
  }

  /**
   * Returns the number of the previous page.
   * Will be null once you're on the first page.
   */
  getPrevCursor(): number | null {
    return this.cursor > 1 ? this.cursor - 1 : null
  }
}
