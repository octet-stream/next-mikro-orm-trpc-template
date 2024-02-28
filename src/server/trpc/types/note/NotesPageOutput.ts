import type {input, output} from "zod"

import {createPageOutput} from "../../helpers/createPageOutput"
import {NotesPageInput} from "./NotesPageInput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NotesPageOutput = createPageOutput(NoteBaseOutput, NotesPageInput)

export type INotesPageOutput = input<typeof NotesPageOutput>

export type ONotesPageOutput = output<typeof NotesPageOutput>
