/* eslint-disable import/no-duplicates */

import parseISO from "date-fns/parseISO"
import toDate from "date-fns/toDate"

import isString from "lodash/isString"

export function normalizeDate(date: Date | string | number): Date {
  if (date instanceof Date) {
    return date
  }

  return isString(date) ? parseISO(date) : toDate(date)
}
