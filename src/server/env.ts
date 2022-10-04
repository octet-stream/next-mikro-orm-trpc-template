// THIS FILE SHOULD BE USED ONLY TO SETUP ENV FOR TESTS AND MIKRO-ORM CLI!
// eslint-disable-next-line import/no-extraneous-dependencies
import * as env from "@next/env"

import {noop} from "lodash"

env.loadEnvConfig(
  process.cwd(),

  process.env.NODE_ENV !== "production",

  {
    error: console.error.bind(console),
    info: process.env.NODE_ENV === "test" ? noop : console.log.bind(console)
  }
)
