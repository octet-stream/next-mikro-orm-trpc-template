import type {SubmitHandler} from "react-hook-form"
import {toast} from "react-hot-toast"
import {useCallback} from "react"
import type {FC} from "react"

import merge from "lodash/merge"

import {NoteUpdateInput} from "server/trpc/type/input/NoteUpdateInput"
import type {INoteUpdateInput} from "server/trpc/type/input/NoteUpdateInput"

import {client} from "lib/trpc/client"

import {useNoteStateProxy, useNoteStateSnapshot} from "context/NoteStateContext"

import {createNoteModal} from "../createNoteModal"

import {Open} from "./Open"

type Submit = SubmitHandler<Omit<INoteUpdateInput, "id">>

const Modal = createNoteModal({
  name: "Update",
  validate: NoteUpdateInput.omit({id: true})
})

export const NoteUpdateModal: FC = () => {
  const {id, ...rest} = useNoteStateSnapshot()

  const proxy = useNoteStateProxy()

  const submit = useCallback<Submit>(data => (
    client.note.update.mutate({...data, id})
      .then(updated => {
        // Update state
        merge(proxy, updated)

        toast.success("Note updated!")
      })
      .catch(error => {
        console.log(error)
        toast.error("Can't update this note.")
      })
  ), [id])

  return (
    <Modal
      title="Update the note"
      values={rest}
      submit={submit}
      openButton={Open}
    />
  )
}
