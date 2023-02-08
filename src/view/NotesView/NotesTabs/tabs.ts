import {
  NoteStatusFilter,
  NoteStatusFilterNames
} from "server/trpc/type/common/NoteStatusFilter"

export const tabs = Object.values(NoteStatusFilter)
export const filters = Object.entries(NoteStatusFilterNames)
