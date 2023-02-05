// TODO: Move thise components outside the dialog
/* eslint-disable react/no-unstable-nested-components */

import {useEvent} from "react-use-event-hook"
import {useCallback, useState} from "react"
import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {client} from "lib/trpc/client"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {ConfirmationDialog} from "component/ConfirmationDialog"

import {Open} from "./Open"
import {Cancel} from "./Cancel"
import {Confirm} from "./Confirm"

interface Props { }

export const NoteRemoveDialog: FC<Props> = () => {
  const [isRemovePermanently, setRemovePermanently] = useState(false)

  const router = useRouter()

  const {id} = useNoteStateSnapshot()

  // eslint-disable-next-line
  const togglePermanentRemove = useEvent(
    () => setRemovePermanently(flag => !flag)
  )

  const reset = useEvent(() => setRemovePermanently(false))

  const remove = useCallback(() => (
    client.note.remove.mutate({id, soft: !isRemovePermanently})
      .then(() => router.replace("/"))
      .catch(error => {
        console.error(error)
        toast.error("Can't delete this note.")
      })
  ), [id, isRemovePermanently])

  return (
    <ConfirmationDialog
      title="Removing the note"
      onConfirm={remove}
      confirmButton={Confirm}
      cancelButton={Cancel}
      openButton={Open}
      onClose={reset}
    >
      <div className="select-none">
        <div className="border border-orange-500 dark:border-orange-700 bg-orange-100 dark:bg-orange-200 p-2 rounded-md text-center text-orange-700">
          <div>
            <label htmlFor="soft">
              <input
                id="soft"
                type="checkbox"
                checked={isRemovePermanently}
                onChange={togglePermanentRemove}
              />

              {" "}

              <span>Remove permanently?</span>
            </label>

          </div>
          <div>
            <span>Warning: If enabled, the operation could not be </span>
            <strong>reverted</strong>!
          </div>

        </div>

        <div className="mt-6">
          Are you <strong>absolutely sure</strong> you want to remove this note?
        </div>
      </div>
    </ConfirmationDialog>
  )
}
