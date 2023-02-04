/* eslint-disable react/no-unstable-nested-components */
import type {SubmitHandler} from "react-hook-form"
import {useEvent} from "react-use-event-hook"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import isString from "lodash/isString"

import {NoteCreateInput} from "server/trpc/type/input/NoteCreateInput"
import type {TNoteCreateInput} from "server/trpc/type/input/NoteCreateInput"

import {client} from "lib/trpc/client"

import {useNotesStateProxy} from "context/NotesStateContext"

import {FloatingButton} from "component/FloatingButton"

import {createNoteModal} from "./createNoteModal"

const Modal = createNoteModal({
  name: "Create",
  validate: NoteCreateInput
})

interface Props {
  redirect?: string | boolean
}

export const NoteCreateModal: FC<Props> = ({redirect}) => {
  const router = useRouter()
  const state = useNotesStateProxy()

  const submit = useEvent<SubmitHandler<TNoteCreateInput>>(data => (
    client.note.create.mutate(data)
      .then(note => {
        state.items.unshift(note)
        state.itemsCount++
        state.rowsCount++

        if (redirect) {
          return router.replace(
            isString(redirect) ? redirect : `/view/${note.id}`,

            undefined,

            {
              unstable_skipClientCache: true
            }
          )
        }
      })
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
