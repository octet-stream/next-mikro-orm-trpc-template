/* eslint-disable import/no-duplicates */

import {
  format,
  toDate,
  differenceInCalendarWeeks,
  differenceInCalendarDays,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  differenceInHours
} from "date-fns"

import type {RawDate} from "lib/type/RawDate"

import {formatTime, TIME_FORMAT} from "./formatTime"

export const LAST_WEEK_FORMAT = `'Last' EEEE 'at' ${TIME_FORMAT}`

export const DATE_FORMAT = "dd.MM.yyyy"

export const DATETIME_FORMAT = `${DATE_FORMAT} 'at' ${TIME_FORMAT}`

const relative = new Intl.RelativeTimeFormat("en", {
  style: "long"
})

function formatRelativeTime(left: Date, right: Date): string {
  const minutesDiff = differenceInMinutes(left, right)
  const hoursDiff = differenceInHours(left, right)

  if (minutesDiff === 0) {
    return "Less than a minute ago"
  }

  if (Math.abs(minutesDiff) < 60) {
    return relative.format(minutesDiff, "minute")
  }

  return relative.format(hoursDiff, "hour")
}

function formatRelativeDays(left: Date, right: Date, diff: number): string {
  // When the date is today
  if (diff === 0) {
    return formatRelativeTime(left, right)
  }

  // When the date is yesterday
  if (diff === -1) {
    return `Yesterday at ${formatTime(left)}`
  }

  // When the difference is more than 1 week and less then 2
  const weeksDiff = differenceInCalendarWeeks(left, right)
  if (weeksDiff > -2 && weeksDiff <= -1) {
    return format(left, LAST_WEEK_FORMAT)
  }

  return relative.format(diff, "day")
}

/**
 * Formats given `date` relative to `from` date in human-readable form.
 */
export function formatRelative(
  date: RawDate,
  from: RawDate = new Date()
): string {
  const left = toDate(date)
  const right = toDate(from)

  const yearsDiff = differenceInYears(left, right)
  const daysDiff = differenceInCalendarDays(left, right)
  const monthDiff = differenceInMonths(left, right)

  if (daysDiff > 0) {
    throw new RangeError("Cannot use with the future date.")
  }

  if (monthDiff === 0) {
    return formatRelativeDays(left, right, daysDiff)
  }

  if (Math.abs(monthDiff) < 12) {
    return relative.format(monthDiff, "month")
  }

  if (Math.abs(yearsDiff) <= 10) {
    return relative.format(yearsDiff, "year")
  }

  return format(left, DATETIME_FORMAT)
}
