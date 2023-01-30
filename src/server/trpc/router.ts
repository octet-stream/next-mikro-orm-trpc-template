import {trpc} from "server/trpc/def"

import ponies from "./route/ponies"
import pony from "./route/pony"

import {notes} from "./route/notes"
import {note} from "./route/note"

export const router = trpc.router({
  ponies,
  pony,

  notes,
  note
})

export type Router = typeof router

export type Caller = ReturnType<typeof router.createCaller>
