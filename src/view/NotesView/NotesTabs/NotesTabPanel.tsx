import type {FC, ReactNode} from "react"
import {Tab} from "@headlessui/react"

interface Props {
  children: ReactNode
}

// TODO: Add a component for loading state fallback
export const NotesTabPanel: FC<Props> = ({children}) => (
  <Tab.Panel static>
    {children}
  </Tab.Panel>
)
