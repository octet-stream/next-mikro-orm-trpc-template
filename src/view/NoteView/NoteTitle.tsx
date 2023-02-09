import type {FC} from "react"

import {useNoteStateSnapshot} from "context/NoteStateContext"

export const NoteTitle: FC = () => {
  const {title} = useNoteStateSnapshot()

  return (
    <h2 className="text-3xl">
      {title}
    </h2>
  )
}
