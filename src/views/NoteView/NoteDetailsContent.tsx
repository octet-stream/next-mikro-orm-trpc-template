import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const NoteDetailsContent: FC<Props> = ({children}) => (
  <div className="prose dark:prose-invert">
    {children}
  </div>
)
