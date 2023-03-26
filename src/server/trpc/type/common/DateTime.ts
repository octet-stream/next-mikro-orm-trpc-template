/* eslint-disable import/no-duplicates */

import type {input, output} from "zod"
import {z} from "zod"

import isString from "lodash/isString"
import toDate from "date-fns/toDate"
import parseISO from "date-fns/parseISO"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform<Date>(date => isString(date) ? parseISO(date) : toDate(date))
  .transform<string>(date => date.toISOString())

export type IDateTime = input<typeof DateTime>

export type ODateTime = output<typeof DateTime>
