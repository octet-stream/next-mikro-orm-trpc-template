import {trpc} from "server/trpc/def"

import {notes} from "./routes/notes"
import {note} from "./routes/note"

export const router = trpc.router({
  notes,
  note
})

export type Router = typeof router

export const createCaller = trpc.createCallerFactory(router)

export type Caller = ReturnType<typeof createCaller>
