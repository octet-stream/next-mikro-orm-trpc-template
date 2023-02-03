import type {FC} from "react"

import {NoteControls} from "component/NoteControls"
import {NoteRemoveDialog} from "component/NoteRemoveDialog"

export const NoteFooter: FC = () => (
  <div className="flex flex-row mt-10">
    <NoteControls />

    <div className="flex-1" />

    <NoteRemoveDialog />
  </div>
)
