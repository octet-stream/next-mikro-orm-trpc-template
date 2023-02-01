import merge from "lodash/merge"
import pick from "lodash/pick"

import type {PickKeys} from "lib/type/PickKeys"

import type {TNoteBaseOutput} from "server/trpc/type/output/NoteBaseOutput"

type Getters = PickKeys<TNoteBaseOutput, "status" | "isCompleted" | "isInProgress" | "isRejected">

export const patchNodeStatus = (
  state: TNoteBaseOutput,
  patch: Partial<TNoteBaseOutput>
) => merge(state, pick<Partial<TNoteBaseOutput>, Getters>(patch, [
  "status",
  "isCompleted",
  "isInProgress",
  "isRejected"
]))
