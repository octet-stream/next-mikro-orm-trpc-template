import {format, toDate} from "date-fns"
import type {FC} from "react"
import {useMemo} from "react"

import {formatRelative, DATE_FORMAT} from "../../lib/utils/formatRelative"
import {useNoteStateSnapshot} from "../../contexts/NoteStateContext"

export const NoteInfo: FC = () => {
  const {createdAt} = useNoteStateSnapshot()

  const noted = useMemo<string>(
    () => typeof window === "undefined"
      ? format(toDate(createdAt), DATE_FORMAT)
      : formatRelative(createdAt),

    [createdAt]
  )

  return (
    <div className="text-gray-400 dark:text-gray-600 text-xs select-none" suppressHydrationWarning>
      noted {noted}
    </div>
  )
}
