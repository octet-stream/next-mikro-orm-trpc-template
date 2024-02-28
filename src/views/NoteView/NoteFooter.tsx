import type {FC} from "react"

import {NoteControls} from "../../components/NoteControls"
import {NoteRemoveDialog} from "../../components/NoteRemoveDialog"
import {useNoteStateSnapshot} from "../../contexts/NoteStateContext"

export const NoteFooter: FC = () => {
  const {isRejected} = useNoteStateSnapshot()

  return (
    <div className="flex flex-row mt-10">
      {!isRejected && <NoteControls />}

      <div className="flex-1" />

      <NoteRemoveDialog />
    </div>
  )
}
