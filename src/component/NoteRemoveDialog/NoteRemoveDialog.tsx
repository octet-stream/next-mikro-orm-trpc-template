import {useEvent} from "react-use-event-hook"
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
import {Options} from "./Options"
import {Warning} from "./Warning"
import type {OptionValue} from "./Options"

interface Props { }

export const NoteRemoveDialog: FC<Props> = () => {
  const [action, setAction] = useState<OptionValue>("reject")

  const router = useRouter()

  const {id, isRejected} = useNoteStateSnapshot()

  const reset = useEvent(() => setAction("reject"))

  const remove = useCallback(async () => {
    try {
      await client.note.remove.mutate({
        id,

        soft: action === "reject" && isRejected === false
      })

      router.replace("/", undefined, {unstable_skipClientCache: true})
    } catch (error) {
      console.error(error)
      toast.error("Can't delete this note.")
    }
  }, [id, action, isRejected, router])

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
        {
          isRejected
            ? <Warning />
            : <Options value={action} onChange={setAction} />
        }

        <div className="mt-6">
          Are you <strong>absolutely sure</strong> you want to remove this note?
        </div>
      </div>
    </ConfirmationDialog>
  )
}
