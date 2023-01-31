import {forwardRef, createElement, useCallback} from "react"
import type {ComponentPropsWithoutRef} from "react"
import type {LucideIcon} from "lucide-react"
import {toast} from "react-hot-toast"

import {NoteStatus} from "server/trpc/type/common/NoteStatus"

import {useNoteDataContext} from "context/NoteDataContext"
import {client} from "lib/trpc/client"

import cn from "clsx"

export interface CreateControlButtonOptions {
  icon: LucideIcon
  status: NoteStatus
}

type Props = Omit<ComponentPropsWithoutRef<"button">, "type">

export const createControlButton = ({
  icon,
  status
}: CreateControlButtonOptions) => forwardRef<HTMLButtonElement, Props>(
  ({className, ...props}, ref) => {
    const {id} = useNoteDataContext()

    const updateStatus = useCallback(() => (
      client.note.update.mutate({id, status})
        .catch(error => {
          console.log(error)
          toast.error("Can't update note's status")
        })
    ), [id])

    return (
      <button
        {...props}

        ref={ref}
        type="button"
        className={cn("cursor-pointer mr-3 disabled:cursor-not-allowed text-gray-300 disabled:text-gray-300 dark:text-gray-700 disabled:dark:text-gray-700 hover:text-white transition-colors duration-200 disabled:transition-none", className)}
        onClick={updateStatus}
      >
        {createElement(icon, {size: 28})}
      </button>
    )
  }
)
