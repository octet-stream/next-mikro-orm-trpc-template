import merge from "lodash/merge"
import pick from "lodash/pick"

import type {PickKeys} from "lib/type/PickKeys"

import type {ONoteBaseOutput} from "server/trpc/type/output/NoteBaseOutput"

type Statuses = PickKeys<ONoteBaseOutput, "status" | "isCompleted" | "isInProgress" | "isRejected" | "isPaused">

export const patchNodeStatus = (
  state: ONoteBaseOutput,
  patch: Partial<ONoteBaseOutput>
) => merge(state, pick<Partial<ONoteBaseOutput>, Statuses>(patch, [
  "status",
  "isCompleted",
  "isInProgress",
  "isRejected",
  "isPaused"
]))
