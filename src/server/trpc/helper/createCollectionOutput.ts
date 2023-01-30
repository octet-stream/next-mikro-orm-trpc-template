/* eslint-disable @typescript-eslint/indent */
import {Collection} from "@mikro-orm/core"
import {z, NEVER, ZodIssueCode} from "zod"

// FIXME: Find a way to improve collections validation with Zod
export const createCollectionOutput = <T extends object>() => z
  .unknown()
  .superRefine((arg, ctx): arg is Collection<T> => {
    if (!(arg instanceof Collection)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Input must be a Collection",
      })
    }

    return NEVER
  })
  .transform(arg => Array.from(arg))
