import {toast} from "react-hot-toast"
import {Check} from "lucide-react"
import {useCallback} from "react"
import type {FC} from "react"

import cn from "clsx"
import Link from "next/link"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {client} from "lib/trpc/client"

import {Card} from "component/Card"
import {useNoteDataContext} from "context/NoteDataContext"

interface Props { }

export const NoteCard: FC<Props> = () => {
  const {id, title, isCompleted, status} = useNoteDataContext()

  const notePath = `/view/${id}`

  const updateStatus = useCallback(() => {
    const newStatus = status === NoteStatus.COMPLETED
      ? NoteStatus.INCOMPLETED
      : NoteStatus.COMPLETED

    return (
      client.note.update.mutate({id, status: newStatus})
        .catch(error => {
          console.error(error)
          toast.error("Can't update this note")
        })
    )
  }, [id, status])

  return (
    <Card className="flex flex-row">
      <div className="pl-4 pr-1 relative flex justify-center items-center">
        <Link href={notePath} className="absolute inset-0" />

        <button
          type="button"
          className="relative z-0 cursor-pointer w-6 h-6 flex items-center justify-center rounded-full border dark:border-gray-500"
          onClick={updateStatus}
        >
          {isCompleted && <Check size={16} className="text-gray-300 dark:text-gray-500" />}
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
