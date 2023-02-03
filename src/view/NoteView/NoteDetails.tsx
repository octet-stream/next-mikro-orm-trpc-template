import type {FC} from "react"

import {useNoteStateSnapshot} from "context/NoteStateContext"

export const NoteDetails: FC = () => {
  const {details} = useNoteStateSnapshot()

  return (
    <div className="mt-5">
      {
        details ? (
          <p>
            {details}
          </p>
        ) : (
          <p className="text-gray-400 dark:text-gray-600">
            No details
          </p>
        )
      }
    </div>
  )
}
