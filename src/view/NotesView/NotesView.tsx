import type {FC} from "react"

import {useNotesStateSnapshot} from "context/NotesStateContext"

import {NotesEmpty} from "./NotesEmpty"
import {NotesList} from "./NotesList"

export const NotesView: FC = () => {
  const {itemsCount} = useNotesStateSnapshot()

  return itemsCount > 0 ? <NotesList /> : <NotesEmpty />
}
