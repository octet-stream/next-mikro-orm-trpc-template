import {z} from "zod"

export enum NoteStatus {
  INCOMPLETED = "incompleted",
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  PAUSED = "paused",
  REJECTED = "rejected"
}

export const NoteStatusSchema = z.nativeEnum(NoteStatus)
