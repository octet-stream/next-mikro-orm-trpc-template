import {infer as Infer} from "zod"

import {createPageOutput} from "../../helper/createPageOutput"
import {PonyOutput} from "./PonyOutput"

export const PoniesPageOutput = createPageOutput(PonyOutput)

export interface IPoniesPageOutput extends Infer<typeof PoniesPageOutput> { }
