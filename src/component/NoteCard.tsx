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
  const {id, title, status} = useNoteDataContext()

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
    <Card>
      <div className="p-4 pr-1 relative">
        <Link href={notePath} className="absolute inset-0" />

        <button
          type="button"
          className="relative z-0 cursor-pointer w-6 h-6 rounded-full border dark:border-gray-500 flex justify-center items-center"
          onClick={updateStatus}
        >
          {status === NoteStatus.COMPLETED && <Check size={16} className="text-gray-300 dark:text-gray-500" />}
        </button>
      </div>

      <Link href={notePath} className="flex flex-1">
        <div className={cn("p-4 pl-1 flex flex-1", {"line-through text-gray-300 dark:text-gray-500": status === NoteStatus.COMPLETED})}>
          {title}
        </div>
      </Link>
    </Card>
  )
}
