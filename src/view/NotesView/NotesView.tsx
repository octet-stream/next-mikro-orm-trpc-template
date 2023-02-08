import type {FC} from "react"
import {Fragment} from "react"

import {useNotesStateSnapshot} from "context/NotesStateContext"

import {NoteCreateModal} from "component/NoteModal/NoteCreateModal"

import {NotesEmpty} from "./NotesEmpty"
import {NotesList} from "./NotesList"

export const NotesView: FC = () => {
  const {itemsCount} = useNotesStateSnapshot()

  return (
    <Fragment>
      {itemsCount > 0 ? <NotesList /> : <NotesEmpty />}

      <NoteCreateModal />
    </Fragment>
  )
}
