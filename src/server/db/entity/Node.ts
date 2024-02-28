import {PrimaryKey} from "@mikro-orm/mysql"
import {nanoid} from "nanoid"

import {ONode} from "server/trpc/types/common/Node"

export abstract class Node implements ONode {
  @PrimaryKey()
  readonly id: string = nanoid()
}
