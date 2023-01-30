import {infer as Infer} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"

import {NoteOutput} from "./NoteOutput"

export const NotesPageOutput = createPageOutput(NoteOutput.omit({
  completions: true
}))

export type TNotesPageOutput = Infer<typeof NotesPageOutput>
