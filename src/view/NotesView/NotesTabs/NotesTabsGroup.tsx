import type {FC, ReactNode} from "react"
import {Tab} from "@headlessui/react"

import {useNotesTabsContext} from "./NotesTabsContext"

interface Props {
  children: ReactNode
}

export const NotesTabsGroup: FC<Props> = ({children}) => {
  const {index, setIndex} = useNotesTabsContext()

  return (
    <Tab.Group selectedIndex={index} onChange={setIndex} manual>
      {children}
    </Tab.Group>
  )
}
