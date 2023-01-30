import {infer as Infer} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"

import {NoteBaseOutput} from "./NoteBaseOutput"

export const NotesPageOutput = createPageOutput(NoteBaseOutput)

export type TNotesPageOutput = Infer<typeof NotesPageOutput>
