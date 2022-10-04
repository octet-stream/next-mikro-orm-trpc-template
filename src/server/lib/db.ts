/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import "reflect-metadata"

import {MikroORM, Configuration} from "@mikro-orm/core"
import type {EntityManager} from "@mikro-orm/core"

import {assertRequiredEnv} from "server/lib/util/assertRequiredEnv"

import {
  Pony
} from "server/db/entity"

const isTestEnv = process.env.NODE_ENV === "test"

interface RunIsolatedCallback<T> {
  (em: EntityManager): T
}

type GlobalThis = typeof globalThis

interface GlobalThisWithORM extends GlobalThis {
  __CACHED_ORM__: MikroORM
}

const globalObject = globalThis as GlobalThisWithORM

assertRequiredEnv([
  {
    name: "MIKRO_ORM_DB_NAME",
    value: process.env.MIKRO_ORM_DB_NAME
  },
  {
    name: "MIKRO_ORM_USER",
    value: process.env.MIKRO_ORM_USER,
  },
  {
    name: "MIKRO_ORM_PASSWORD",
    value: process.env.MIKRO_ORM_PASSWORD
  }
])

/**
 * Returns config for MikroORM with parameters taken from .env.* files.
 *
 * Note to read and inject these parameters onto `process.env` when running outside Next.js
 */
export const getConfig = () => new Configuration(
  {
    type: "mysql",
    implicitTransactions: true,
    entities: [
      Pony
    ],
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
    connect: !isTestEnv
  },

  !isTestEnv
).getAll()

/**
 * Returns MikroORM instance.
 * Creates the new if one does not exists, then caches it.
 */
export async function getORM() {
  if (!globalObject.__CACHED_ORM__) {
    globalObject.__CACHED_ORM__ = await MikroORM.init(getConfig())
  }

  return globalObject.__CACHED_ORM__
}

export async function forkEntityManager(): Promise<EntityManager> {
  const orm = await getORM()

  return orm.em.fork()
}

/**
 * Runs given function with isolated EntityManager, created with `em.fork()`.
 *
 * Returns the result of the function and cleans that `em`.
 *
 * @param fn
 */
export async function runIsolatied<T>(fn: RunIsolatedCallback<T>): Promise<T> {
  const em = await forkEntityManager()

  try {
    const result = await fn(em)

    return result
  } finally {
    em.clear()
  }
}
