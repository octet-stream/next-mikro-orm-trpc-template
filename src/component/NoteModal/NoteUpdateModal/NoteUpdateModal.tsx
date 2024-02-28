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

  const submit = useCallback<Submit>(async data => {
    try {
      merge(proxy, await client.note.update.mutate({...data, id}))

      toast.success("Note updated!")
    } catch (error) {
      console.log(error)
      toast.error("Can't update this note.")
    }
  }, [id, proxy])

  return (
    <Modal
      title="Update the note"
      values={rest}
      submit={submit}
      openButton={Open}
    />
  )
}
