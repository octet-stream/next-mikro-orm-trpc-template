import {useEvent} from "react-use-event-hook"
import {RadioGroup} from "@headlessui/react"
import {useCallback, useState} from "react"
import {useRouter} from "next/router"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {client} from "lib/trpc/client"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {ConfirmationDialog} from "component/ConfirmationDialog"

import {Open} from "./Open"
import {Cancel} from "./Cancel"
import {Confirm} from "./Confirm"

interface Props { }

type OptionValue = "reject" | "delete"

export const NoteRemoveDialog: FC<Props> = () => {
  const [action, setAction] = useState<OptionValue>("reject")

  const router = useRouter()

  const {id} = useNoteStateSnapshot()

  const reset = useEvent(() => setAction("reject"))

  const remove = useCallback(() => (
    client.note.remove.mutate({id, soft: action === "reject"})
      .then(async () => {
        await router.replace("/", undefined, {unstable_skipClientCache: true})
      })
      .catch(error => {
        console.error(error)
        toast.error("Can't delete this note.")
      })
  ), [id, action])

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
        <RadioGroup value={action} onChange={setAction}>
          <RadioGroup.Option value="reject" className="px-4 py-2 mb-2 rounded-md border-2 border-gray-300 dark:border-gray-500 ui-checked:bg-gray-200 ui-checked:dark:bg-gray-800 cursor-pointer">
            <div className="font-bold">Reject</div>
            <div>The note will be marked as rejected</div>
            <div>You will be able to find it by the <i>Rejected</i> tab</div>
          </RadioGroup.Option>

          <RadioGroup.Option value="delete" className="px-4 py-2 rounded-md border-2 border-red-500 cursor-pointer ui-checked:bg-gray-200 ui-checked:dark:bg-gray-800">
            <div className="font-bold">Delete</div>
            <div>The note will be removed completely</div>
            <div className="text-orange-600 dark:text-orange-500">
              Warning: This operation is <strong>permanent</strong>!
            </div>
          </RadioGroup.Option>
        </RadioGroup>

        <div className="mt-6">
          Are you <strong>absolutely sure</strong> you want to remove this note?
        </div>
      </div>
    </ConfirmationDialog>
  )
}
