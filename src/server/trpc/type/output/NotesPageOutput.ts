import type {infer as Infer} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"
import {NotesPageInput} from "server/trpc/type/input/NotesPageInput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NotesPageOutput = createPageOutput(NoteBaseOutput, NotesPageInput)

export type TNotesPageOutput = Infer<typeof NotesPageOutput>
