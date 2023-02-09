import {Entity, PrimaryKey} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import {TNode} from "server/trpc/type/common/Node"

@Entity({abstract: true})
export abstract class Base implements TNode {
  @PrimaryKey()
  readonly id: string = nanoid()
}
