// TODO: Move thise components outside the dialog
/* eslint-disable react/no-unstable-nested-components */

import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import {useCallback} from "react"
import type {FC} from "react"

import {client} from "lib/trpc/client"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {ConfirmationDialog} from "component/ConfirmationDialog"

import {Open} from "./Open"
import {Cancel} from "./Cancel"
import {Confirm} from "./Confirm"

interface Props { }

export const NoteRemoveDialog: FC<Props> = () => {
  const router = useRouter()

  const {id} = useNoteStateSnapshot()

  const remove = useCallback(() => (
    client.note.remove.mutate({id})
      .then(() => router.replace("/"))
      .catch(error => {
        console.error(error)
        toast.error("Can't delete this note.")
      })
  ), [id])

  return (
    <ConfirmationDialog
      title="Removing the note"
      onConfirm={remove}
      confirmButton={Confirm}
      cancelButton={Cancel}
      openButton={Open}
    >
      <div className="select-none">
        <div className="border border-orange-500 dark:border-orange-700 bg-orange-100 dark:bg-orange-200 p-2 rounded-md text-center text-orange-700">
          <span>Warning: This operation is </span>
          <strong>permanent</strong>!
        </div>

        <div className="mt-6">
          Are you <strong>absolutely sure</strong> you want to remove this note?
        </div>
      </div>
    </ConfirmationDialog>
  )
}
