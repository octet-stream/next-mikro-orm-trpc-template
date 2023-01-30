/* eslint-disable react/no-unstable-nested-components */
import type {SubmitHandler} from "react-hook-form"
import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {NoteCreateInput} from "server/trpc/type/input/NoteCreateInput"
import type {TNoteCreateInput} from "server/trpc/type/input/NoteCreateInput"

import {client} from "lib/trpc/client"

import {FloatingButton} from "component/FloatingButton"

import {createNoteModal} from "./createNoteModal"

const Modal = createNoteModal({
  name: "Create",
  validate: NoteCreateInput
})

export const NoteCreateModal: FC = () => {
  const router = useRouter()

  const submit = useEvent<SubmitHandler<TNoteCreateInput>>(data => (
    client.note.create.mutate(data)
      .then(() => router.refresh())
      .catch(error => {
        console.log(error)
        toast.error("Can't create a note.")
      })
  ))

  return (
    <Modal
      title="Add a note"
      submit={submit}
      openButton={({open}) => <FloatingButton onClick={open} />}
    />
  )
}
