import type {Loaded} from "@mikro-orm/core"

/**
 * Picks entity fields from `Loaded` type, returned by `em.find()` or `em.findOne()` methods.
 */
export type FilterEntity<T> = T extends Loaded<T, infer L>
  ? Pick<T, L extends keyof T ? L : never>
  : T
