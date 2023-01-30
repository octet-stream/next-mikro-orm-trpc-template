import {infer as Infer} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {PonyInput} from "server/trpc/type/input/PonyInput"

export const PonyOutput = Record.extend(PonyInput.shape)

export interface IPonyOutput extends Infer<typeof PonyOutput> { }
