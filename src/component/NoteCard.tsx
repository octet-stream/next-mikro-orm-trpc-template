import {Check, Lock} from "lucide-react"
import {toast} from "react-hot-toast"
import {useCallback} from "react"
import type {FC} from "react"

import cn from "clsx"
import Link from "next/link"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {patchNodeStatus} from "lib/util/patchNoteStatus"
import {client} from "lib/trpc/client"

import {Card} from "component/Card"
import {useNoteStateSnapshot, useNoteStateProxy} from "context/NoteStateContext"

interface Props { }

export const NoteCard: FC<Props> = () => {
  const state = useNoteStateProxy()

  const {id, title, status, isCompleted, isRejected} = useNoteStateSnapshot()

  const notePath = `/view/${id}`

  const updateStatus = useCallback(() => {
    const newStatus = isCompleted
      ? NoteStatus.INCOMPLETED
      : NoteStatus.COMPLETED

    return (
      client.note.update.mutate({id, status: newStatus})
        .then(updated => patchNodeStatus(state, updated))
        .catch(error => {
          console.error(error)
          toast.error("Can't update this note")
        })
    )
  }, [id, status, isCompleted])

  return (
    <Card className="flex flex-row">
      <div className="pl-4 pr-1 relative flex justify-center items-center">
        <Link href={notePath} className="absolute inset-0" aria-label={title} />

        <button
          type="button"
          aria-label="Complete note"
          className="relative z-0 cursor-pointer w-6 h-6 flex items-center justify-center rounded-full border dark:border-gray-500 disabled:cursor-not-allowed disabled:dark:border-gray-700"
          disabled={isRejected}
          onClick={updateStatus}
        >
          {isCompleted && <Check size={16} className="text-gray-300 dark:text-gray-500" />}

          {isRejected && <Lock size={16} className="text-gray-300 dark:text-gray-700" />}
        </button>
      </div>

      <Link href={notePath} className="flex flex-1">
        <div className={cn("py-4 pl-1 pr-4", {"line-through text-gray-300 dark:text-gray-500": isCompleted})}>
          {title}
        </div>
      </Link>
    </Card>
  )
}
