import {Fragment} from "react"
import type {FC} from "react"

import {useNotesStateSnapshot} from "../../contexts/NotesStateContext"
import {NoteCreateModal} from "../../components/NoteModal/NoteCreateModal"

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
