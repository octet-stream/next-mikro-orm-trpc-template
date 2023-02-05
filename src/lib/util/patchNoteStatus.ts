import merge from "lodash/merge"
import pick from "lodash/pick"

import type {PickKeys} from "lib/type/PickKeys"

import type {TNoteBaseOutput} from "server/trpc/type/output/NoteBaseOutput"

type Statuses = PickKeys<TNoteBaseOutput, "status" | "isCompleted" | "isInProgress" | "isRejected" | "isPaused">

export const patchNodeStatus = (
  state: TNoteBaseOutput,
  patch: Partial<TNoteBaseOutput>
) => merge(state, pick<Partial<TNoteBaseOutput>, Statuses>(patch, [
  "status",
  "isCompleted",
  "isInProgress",
  "isRejected",
  "isPaused"
]))
