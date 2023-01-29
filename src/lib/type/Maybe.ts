import {MaybeUndefined} from "./MaybeUndefined"
import type {MaybeNull} from "./MaybeNull"

export type Maybe<T> = MaybeNull<MaybeUndefined<T>>
