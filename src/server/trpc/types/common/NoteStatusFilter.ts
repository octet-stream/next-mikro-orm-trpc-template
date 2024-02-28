import {z} from "zod"

export enum NoteStatusFilter {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
  REJECTED = "rejected"
}

export const NoteStatusFilterNames = {
  [NoteStatusFilter.ALL]: "All",
  [NoteStatusFilter.ACTIVE]: "Active",
  [NoteStatusFilter.COMPLETED]: "Completed",
  [NoteStatusFilter.REJECTED]: "Rejected"
} as const

export const NoteStatusFilterSchema = z.nativeEnum(NoteStatusFilter)
