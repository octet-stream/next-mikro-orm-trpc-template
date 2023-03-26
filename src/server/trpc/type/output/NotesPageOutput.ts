import type {input, output} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"
import {NotesPageInput} from "server/trpc/type/input/NotesPageInput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NotesPageOutput = createPageOutput(NoteBaseOutput, NotesPageInput)

export type INotesPageOutput = input<typeof NotesPageOutput>

export type ONotesPageOutput = output<typeof NotesPageOutput>
