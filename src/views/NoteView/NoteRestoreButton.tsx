import {useEvent} from "react-use-event-hook"
import {RotateCcw} from "lucide-react"
import type {FC} from "react"

import {
  useNoteStateSnapshot,
  useNoteStateProxy
} from "../../contexts/NoteStateContext"

import {client} from "../../lib/trpc/client"
import {patchNodeStatus} from "../../lib/utils/patchNoteStatus"

export const NoteRestoreButton: FC = () => {
  const note = useNoteStateProxy()

  const {id} = useNoteStateSnapshot()

  const restore = useEvent(() => (
    client.note.restore.mutate({id})
      .then(updated => patchNodeStatus(note, updated))
      .catch(error => {
        console.error(error)
      })
  ))

  return (
    <button type="button" aria-label="Restore note" onClick={restore}>
      <RotateCcw size={28} className="text-black dark:text-white" />
    </button>
  )
}
