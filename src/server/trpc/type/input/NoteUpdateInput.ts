import type {input, output} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {NoteCreateInput} from "./NoteCreateInput"

export const NoteUpdateInput = Node
  .extend(NoteCreateInput.partial().shape)

export type INoteUpdateInput = input<typeof NoteUpdateInput>

export type ONoteUpdateInput = output<typeof NoteUpdateInput>
