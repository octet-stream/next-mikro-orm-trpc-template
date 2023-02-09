import {parseISO, toDate} from "date-fns"
import type {infer as Infer} from "zod"
import {z} from "zod"

import isString from "lodash/isString"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform<Date>(date => isString(date) ? parseISO(date) : toDate(date))

export type TDateTime = Infer<typeof DateTime>
