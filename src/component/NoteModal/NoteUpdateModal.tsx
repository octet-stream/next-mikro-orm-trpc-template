/* eslint-disable react/no-unstable-nested-components */
import type {SubmitHandler} from "react-hook-form"
import {toast} from "react-hot-toast"
import {Pencil} from "lucide-react"
import {useCallback} from "react"
import type {FC} from "react"

import merge from "lodash/merge"

import {NoteUpdateInput} from "server/trpc/type/input/NoteUpdateInput"
import type {TNoteUpdateInput} from "server/trpc/type/input/NoteUpdateInput"

import {client} from "lib/trpc/client"

import {useNoteStateProxy, useNoteStateSnapshot} from "context/NoteStateContext"

import {createNoteModal} from "./createNoteModal"

type Submit = SubmitHandler<Omit<TNoteUpdateInput, "id">>

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
      openButton={({open}) => (
        <button type="button" onClick={open}>
          <Pencil size={28} />
        </button>
      )}
    />
  )
}
