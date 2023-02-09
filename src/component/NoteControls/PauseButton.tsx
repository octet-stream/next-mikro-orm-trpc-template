import {Pause} from "lucide-react"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {createControlButton} from "./createControlButton"

export const PauseButton = createControlButton({
  icon: Pause,
  status: NoteStatus.PAUSED
})
