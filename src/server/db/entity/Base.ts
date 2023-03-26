import {Entity, PrimaryKey} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import {ONode} from "server/trpc/type/common/Node"

@Entity({abstract: true})
export abstract class Base implements ONode {
  @PrimaryKey()
  readonly id: string = nanoid()
}
