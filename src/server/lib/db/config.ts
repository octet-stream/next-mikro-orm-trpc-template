import {resolve, join} from "node:path"

import {defineConfig} from "@mikro-orm/mysql"

import {Note, Completion} from "server/db/entity"

const ROOT = resolve("db")

export const getConfig = async () => defineConfig({
  implicitTransactions: true,
  dbName: process.env.MIKRO_ORM_DB_NAME || undefined,
  host: process.env.MIKRO_ORM_HOST || undefined,
  port: parseInt(process.env.MIKRO_ORM_PORT || "", 10) || undefined,
  debug: process.env.NODE_ENV === "development",
  migrations: {
    path: join(ROOT, "migration")
  },
  seeder: {
    path: join(ROOT, "seed")
  },
  entities: [Note, Completion]
})
