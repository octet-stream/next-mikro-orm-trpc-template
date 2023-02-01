import type {FC} from "react"

import {useNotesStateSnapshot} from "context/NotesStateContext"
import {NoteStateContextProvider} from "context/NoteStateContext"

import {NoteCard} from "component/NoteCard"

export const NotesList: FC = () => {
  const notes = useNotesStateSnapshot()

  return (
    <ul className="w-full mobile:max-w-mobile mobile:mx-auto">
      {notes.items.map(note => (
        <li key={note.id} className="py-1 first:pt-0 last:pb-0">
          <NoteStateContextProvider data={note}>
            <NoteCard />
          </NoteStateContextProvider>
        </li>
      ))}
    </ul>
  )
}
