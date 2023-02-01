import {Check, CheckCheck} from "lucide-react"
import {toast} from "react-hot-toast"
import {useCallback} from "react"
import type {FC} from "react"

import cn from "clsx"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {patchNodeStatus} from "lib/util/patchNoteStatus"
import {client} from "lib/trpc/client"

import {
  useNoteStateSnapshot,
  useNoteStateProxy
} from "context/NoteStateContext"

interface Props {
  className?: string
}

export const NoteCompleteButton: FC<Props> = ({className}) => {
  const state = useNoteStateProxy()

  const {id, isCompleted} = useNoteStateSnapshot()

  const toggle = useCallback(() => (
    client.note.update.mutate({
      id,

      status: isCompleted
        ? NoteStatus.INCOMPLETED
        : NoteStatus.COMPLETED
    })
      .then(updated => patchNodeStatus(state, updated))
      .catch(error => {
        console.error(error)
        toast.error("Can't update this note.")
      })
  ), [id, isCompleted])

  return (
    <button type="button" onClick={toggle} className={cn("w-full flex rounded-md py-2 px-6 justify-center border border-gray-400 dark:border-gray-400", className)}>
      <div className="flex flex-row items-center">
        {
          isCompleted
            ? <CheckCheck size={20} className="text-black dark:text-white" />
            : <Check size={20} className="text-black dark:text-white" />
        }

        <div className="ml-2">
          Mark as completed
        </div>
      </div>
    </button>
  )
}
