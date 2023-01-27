import {defineConfig} from "@mikro-orm/mysql"

import {Pony} from "server/db/entity"

export const getConfig = () => defineConfig({
  implicitTransactions: true,
  dbName: process.env.MIKRO_ORM_DB_NAME || undefined,
  host: process.env.MIKRO_ORM_HOST || undefined,
  port: parseInt(process.env.MIKRO_ORM_PORT || "", 10) || undefined,
  debug: process.env.NODE_ENV === "development",
  migrations: {
    path: "migration"
  },
  seeder: {
    path: "seed"
  },
  entities: [Pony]
})
