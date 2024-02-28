import isPlainObject from "lodash/isPlainObject"

import {notFound} from "../errors/notFound"
import {middleware} from "../def"

import type {IDefaultPageInput} from "../helpers/createPageInput"
import type {ODefaultPageOutput} from "../helpers/createPageOutput"

const isPageInput = (value: unknown): value is Required<IDefaultPageInput> => (
  isPlainObject(value) && (value as IDefaultPageInput)?.cursor != null
)

const isPageOutput = (value: unknown): value is ODefaultPageOutput => (
  isPlainObject(value)
    && (value as ODefaultPageOutput).current != null
    && (value as ODefaultPageOutput).pagesCount != null
)

/**
 * Validates if requested page is within possible range and throws NOT_FOUND error is it's not.
 */
export const withPageAssert = middleware(async ({rawInput, next, ctx}) => {
  if (isPageInput(rawInput)) {
    const cursor = rawInput?.cursor

    if (cursor && Number(cursor) <= 0) {
      notFound()
    }
  }

  const result = await next({ctx})

  if (result.ok === false) {
    return result
  }

  const {data} = result

  if (isPageOutput(data) && data.current > data.pagesCount) {
    notFound()
  }

  return result
})
