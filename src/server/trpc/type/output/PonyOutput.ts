import {infer as Infer} from "zod"

import {NodeWithDates} from "server/trpc/type/common/NodeWithDates"
import {PonyInput} from "server/trpc/type/input/PonyInput"

export const PonyOutput = NodeWithDates.extend(PonyInput.shape)

export interface IPonyOutput extends Infer<typeof PonyOutput> { }
