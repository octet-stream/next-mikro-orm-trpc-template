import {Check, CheckCheck} from "lucide-react"
import {useCallback, useMemo} from "react"
import {toast} from "react-hot-toast"
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

  const Icon = useMemo(() => isCompleted ? CheckCheck : Check, [isCompleted])

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
  ), [id, isCompleted, state])

  return (
    <button type="button" aria-label="Complete note" onClick={toggle} className={cn("w-full flex rounded-md py-2 px-6 justify-center border", {"border-gray-300 dark:border-gray-500": isCompleted, "border-black dark:border-gray-400": !isCompleted}, className)}>
      <div className="flex flex-row items-center">
        <Icon size={20} className={cn({"text-gray-300 dark:text-gray-500": isCompleted, "text-black dark:text-white": !isCompleted})} />

        <div className={cn("ml-2", {"line-through text-gray-300 dark:text-gray-500": isCompleted})}>
          Mark as completed
        </div>
      </div>
    </button>
  )
}
