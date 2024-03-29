import type {SubmitHandler} from "react-hook-form"
import {useEvent} from "react-use-event-hook"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import isString from "lodash/isString"

import {NoteCreateInput} from "server/trpc/types/note/NoteCreateInput"
import type {INoteCreateInput} from "server/trpc/types/note/NoteCreateInput"

import {client} from "lib/trpc/client"

import {useNotesStateProxy} from "contexts/NotesStateContext"

import {createNoteModal} from "../createNoteModal"

import {Open} from "./Open"

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

  const submit = useEvent<SubmitHandler<INoteCreateInput>>(async data => {
    try {
      const note = await client.note.create.mutate(data)

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
    } catch (error) {
      console.log(error)
      toast.error("Can't create a note.")
    }
  })

  return (
    <Modal
      title="Add a note"
      submit={submit}
      openButton={Open}
    />
  )
}
