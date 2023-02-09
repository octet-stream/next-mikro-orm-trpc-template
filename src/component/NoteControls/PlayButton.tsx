import {Play} from "lucide-react"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {createControlButton} from "./createControlButton"

export const PlayButton = createControlButton({
  icon: Play,
  status: NoteStatus.IN_PROGRESS
})
