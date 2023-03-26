import type {ReactNode} from "react"

import type {ONotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

export interface NotesTabsBaseProps {
  initialNotes: ONotesPageOutput
  children: ReactNode
}
