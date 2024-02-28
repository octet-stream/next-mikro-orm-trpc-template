import {Property, type Opt} from "@mikro-orm/mysql"

import {Node} from "./Node"

export abstract class Record extends Node {
  /**
   * Date and time the entity was created
  */
 @Property()
 readonly createdAt: Opt<Date> = new Date()

 /**
  * Most recent date and time the entity was updated
 */
@Property({onUpdate: () => new Date()})
readonly updatedAt: Opt<Date> = new Date()
}
