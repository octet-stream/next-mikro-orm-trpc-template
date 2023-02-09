import {Square} from "lucide-react"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {createControlButton} from "./createControlButton"

export const StopButton = createControlButton({
  icon: Square,
  status: NoteStatus.INCOMPLETED
})
