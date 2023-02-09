import type {ReactNode} from "react"

import type {TNotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

export interface NotesTabsBaseProps {
  initialNotes: TNotesPageOutput
  children: ReactNode
}
