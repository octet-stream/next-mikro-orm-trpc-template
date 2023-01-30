import {trpc} from "server/trpc/def"

import {notes} from "./route/notes"
import {note} from "./route/note"

export const router = trpc.router({
  notes,
  note
})

export type Router = typeof router

export type Caller = ReturnType<typeof router.createCaller>
