import {toast} from "react-hot-toast"
import {Check} from "lucide-react"
import {useCallback} from "react"
import type {FC} from "react"

import cn from "clsx"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {client} from "lib/trpc/client"

import {useNoteDataContext} from "context/NoteDataContext"

interface Props { }

export const NoteCompleteButton: FC<Props> = () => {
  const {id, isCompleted, status} = useNoteDataContext()

  const toggle = useCallback(() => (
    client.note.update.mutate({
      id,

      status: status === NoteStatus.COMPLETED
        ? NoteStatus.INCOMPLETED
        : NoteStatus.COMPLETED
    })
      .catch(error => {
        console.error(error)
        toast.error("Can't update this note.")
      })
  ), [id, status])

  return (
    <button type="button" onClick={toggle} className="flex pr-2">
      <div className={cn("relative mr-1 z-0 cursor-pointer w-6 h-6 rounded-full border flex justify-center items-center", {"border-gray-300 dark:border-gray-700": isCompleted, "border-gray-400 dark:border-gray-600": !isCompleted})}>
        {isCompleted && <Check size={16} className="text-gray-300 dark:text-gray-700" />}
      </div>

      <div className={cn("ml-1 flex flex-1", {"line-through text-gray-200 dark:text-gray-700": isCompleted, "text-gray-400 dark:text-gray-600": !isCompleted})}>
        Mark as completed
      </div>
    </button>
  )
}
