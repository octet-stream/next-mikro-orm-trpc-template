/**
 * Picks a set of keys from `T` object, and returns respective union type.
 */
export type PickKeys<T extends object, K extends keyof T> = K
