import {Play} from "lucide-react"

import {NoteStatus} from "server/trpc/types/common/NoteStatus"

import {createControlButton} from "./createControlButton"

export const PlayButton = createControlButton({
  icon: Play,
  status: NoteStatus.IN_PROGRESS
})
