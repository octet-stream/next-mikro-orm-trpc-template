import type {FC} from "react"

import {useNotesStateSnapshot} from "../../contexts/NotesStateContext"
import {NoteStateContextProvider} from "../../contexts/NoteStateContext"
import {NoteCard} from "../../components/NoteCard"

export const NotesList: FC = () => {
  const {items} = useNotesStateSnapshot()

  return (
    <ul>
      {items.map(note => (
        <li key={note.id} className="py-1 first:pt-0 last:pb-0">
          <NoteStateContextProvider data={note}>
            <NoteCard />
          </NoteStateContextProvider>
        </li>
      ))}
    </ul>
  )
}
