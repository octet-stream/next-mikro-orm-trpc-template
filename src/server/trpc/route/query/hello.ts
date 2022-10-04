import {router} from "@trpc/server"
import {z} from "zod"

import {GlobalContext} from "server/trpc/context"

const hello = router<GlobalContext>()
  .query("hello", {
    input: z.object({
      name: z.string().default("world")
    }),

    output: z.string(),

    resolve({input}) {
      return `Hello, ${input.name}!`
    }
  })

export default hello
