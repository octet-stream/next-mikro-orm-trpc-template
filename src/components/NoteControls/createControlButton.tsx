import {forwardRef, createElement, useCallback} from "react"
import type {ComponentPropsWithoutRef} from "react"
import type {LucideIcon} from "lucide-react"
import {toast} from "react-hot-toast"

import {NoteStatus} from "server/trpc/types/common/NoteStatus"

import {client} from "lib/trpc/client"
import {patchNodeStatus} from "lib/utils/patchNoteStatus"

import {useNoteStateProxy, useNoteStateSnapshot} from "contexts/NoteStateContext"

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
    const state = useNoteStateProxy()

    const {id} = useNoteStateSnapshot()

    const updateStatus = useCallback(async () => {
      try {
        patchNodeStatus(state, await client.note.update.mutate({id, status}))
      } catch (error) {
        console.error(error)
        toast.error("Can't update note's status")
      }
    }, [id, state])

    return (
      <button
        {...props}

        ref={ref}
        type="button"
        className={cn("cursor-pointer mr-3 disabled:cursor-not-allowed text-gray-300 disabled:text-gray-300 dark:text-gray-400 disabled:dark:text-gray-700 hover:text-black hover:dark:text-white transition-colors duration-200 disabled:transition-none", className)}
        onClick={updateStatus}
      >
        {createElement(icon, {size: 28})}
      </button>
    )
  }
)
