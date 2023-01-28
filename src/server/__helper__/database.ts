import {customAlphabet} from "nanoid/async"
import {urlAlphabet} from "nanoid"

import mysql from "mysql2/promise"

import {getORM} from "server/lib/db/orm"

const alphanum = urlAlphabet.replace(/[^a-z0-9]/gi, "")
const createDatabaseNameSuffix = customAlphabet(alphanum, 21)

/**
 * Creates a new MySQL connection using mysql2 driver.
 *
 * **Important**: this function requires a user with database management access.
 * You'll probably gonna need to create a user that can manage databases with names starting with twi-test__ name
 */
const createNativeConnection = () => mysql.createConnection({
  port: parseInt(process.env.MIKRO_ORM_PORT!, 10) || undefined,
  user: process.env.MIKRO_ORM_USER
})

export const setup = async () => {
  const name = `mysql-test-db__${await createDatabaseNameSuffix()}`
  process.env.MIKRO_ORM_DB_NAME = name

  const connection = await createNativeConnection()

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\``)
  await connection.end()

  const orm = await getORM()

  const generator = orm.getSchemaGenerator()

  await generator.createSchema()
}

export const cleanup = async () => {
  const orm = await getORM()
  const generator = orm.getSchemaGenerator()

  if (await orm.isConnected()) {
    await generator.dropDatabase(orm.config.get("dbName"))
    await orm.close()
  }
}
