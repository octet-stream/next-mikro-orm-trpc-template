import {z} from "zod"

export enum NoteStatusFilter {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
  REJECTED = "rejected"
}

export const NoteStatusFilterSchema = z.nativeEnum(NoteStatusFilter)
