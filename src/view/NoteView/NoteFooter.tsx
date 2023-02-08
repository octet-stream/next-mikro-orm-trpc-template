import type {FC} from "react"

import {NoteControls} from "component/NoteControls"
import {NoteRemoveDialog} from "component/NoteRemoveDialog"

import {useNoteStateSnapshot} from "context/NoteStateContext"

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
