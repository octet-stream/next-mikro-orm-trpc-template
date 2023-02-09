import type {FC} from "react"

import relative from "date-fns/formatRelative"

import {useNoteStateSnapshot} from "context/NoteStateContext"

export const NoteInfo: FC = () => {
  const {createdAt} = useNoteStateSnapshot()

  return (
    <div className="text-gray-400 dark:text-gray-600 text-xs select-none">
      noted {relative(createdAt, Date.now())}
    </div>
  )
}
