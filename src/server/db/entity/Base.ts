import {Entity, PrimaryKey} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import {INode} from "server/trpc/type/common/Node"

@Entity({abstract: true})
export abstract class Base implements INode {
  @PrimaryKey()
  readonly id: string = nanoid()
}
