import type {infer as Infer} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {NoteCreateInput} from "./NoteCreateInput"

export const NoteUpdateInput = Node
  .extend(NoteCreateInput.partial().shape)
  .omit({completions: true})

export type TNoteUpdateInput = Infer<typeof NoteUpdateInput>
