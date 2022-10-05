import {readFile} from "node:fs/promises"
import {resolve} from "node:path"

import type {IPonyOutput} from "server/trpc/type/output/PonyOutput"

const path = resolve("src", "server", "__fixture__", "ponies.json")

type Ponies = Pick<IPonyOutput, "name" | "race">[]

export async function getPonies(): Promise<Ponies> {
  const data = await readFile(path, "utf8")

  return JSON.parse(data)
}
