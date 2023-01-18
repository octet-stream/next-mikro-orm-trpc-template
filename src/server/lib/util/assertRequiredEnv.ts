import {AssertionError} from "assert"

import type {PickRequiredKeys} from "lib/type/PickRequiredKeys"

interface EnvVariable {
  name: PickRequiredKeys<typeof process.env> | "NEXTAUTH_URL"
  value: string
}

/**
 * Checks if the values of given environment variables is presented.
 * Because these variables are *static* (i. e. not included in runtime), you must list their values and not names
 *
 * @param list A list of required environment variable values and their names.
 */
export const assertRequiredEnv = (list: EnvVariable[]): void => {
  // bypass assertion in test environment
  /* c8 ignore next 3 */
  if (process.env.NODE_ENV === "test" || process.env.DISABLE_ENV_ASSERT) {
    return
  }

  for (const {name, value} of list) {
    if (!value) {
      throw new AssertionError({
        message: `Missing required env variable: ${name}`
      })
    }
  }
}
