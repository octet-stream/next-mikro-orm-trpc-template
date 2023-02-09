import type {FC} from "react"

import {NotesTabsContextProvider} from "./NotesTabsContext"
import {NotesTabsContent} from "./NotesTabsContent"

import type {NotesTabsBaseProps} from "./types"

interface Props extends NotesTabsBaseProps { }

export const NotesTabs: FC<Props> = ({initialNotes, children}) => (
  <div className="w-full mobile:max-w-mobile mobile:mx-auto">
    <NotesTabsContextProvider>
      <NotesTabsContent initialNotes={initialNotes}>
        {children}
      </NotesTabsContent>
    </NotesTabsContextProvider>
  </div>
)
