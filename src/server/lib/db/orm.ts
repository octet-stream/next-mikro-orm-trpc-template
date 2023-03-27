/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

import "reflect-metadata"

import type {EntityManager} from "@mikro-orm/mysql"
import {MikroORM} from "@mikro-orm/mysql"

import {getConfig} from "./config"

interface RunIsolatedCallback<T> {
  (em: EntityManager): T
}

interface WithORM {
  __CACHED_ORM__: MikroORM
  __CACHED_ORM_PROMISE__?: Promise<MikroORM>
}

const globalObject = globalThis as typeof globalThis & WithORM

/**
 * Returns MikroORM instance.
 * Creates the new if one does not exists, then caches it.
 */
export function getORM(): Promise<MikroORM> {
  // Return cached orm initialization to deduplicate unnecessary connections (when page or layout requests run concurrently)
  if (globalObject.__CACHED_ORM_PROMISE__ instanceof Promise) {
    return Promise.resolve(globalObject.__CACHED_ORM_PROMISE__)
  }

  // If no MikroORM instance is cached, initialize new ORM and cache its initialization Promise.
  if (!globalObject.__CACHED_ORM__) {
    globalObject.__CACHED_ORM_PROMISE__ = getConfig()
      .then(config => MikroORM.init(config))
      .then(orm => {
        globalObject.__CACHED_ORM_PROMISE__ = undefined // Remove initialization promise
        globalObject.__CACHED_ORM__ = orm // Cache ORM instance

        return orm
      })

    return Promise.resolve(globalObject.__CACHED_ORM_PROMISE__)
  }

  return Promise.resolve(globalObject.__CACHED_ORM__)
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
