import {useUpdateEffect} from "react-use"
import {Tab} from "@headlessui/react"
import {useState} from "react"
import type {FC} from "react"

import {client} from "lib/trpc/client"

import {NotesStateContextProvider} from "context/NotesStateContext"

import {useNotesTabsContext} from "./NotesTabsContext"
import {NotesTabsGroup} from "./NotesTabsGroup"
import type {NotesTabsBaseProps} from "./types"
import {NotesTabsList} from "./NotesTabsList"
import {NotesTabPanel} from "./NotesTabPanel"

interface Props extends NotesTabsBaseProps { }

export const NotesTabsContent: FC<Props> = ({initialNotes, children}) => {
  const [notes, setNotes] = useState(initialNotes)

  const {setLoading, tab} = useNotesTabsContext()

  useUpdateEffect(() => {
    setLoading(true)

    client.notes.list.query({filter: {status: tab}})
      .then(page => { setNotes(page) })
      .finally(() => { setLoading(false) })
      .catch(error => {
        console.error(error)
      })
  }, [tab])

  return (
    <NotesStateContextProvider data={notes}>
      <NotesTabsGroup>
        <NotesTabsList />

        <Tab.Panels>
          <NotesTabPanel>
            {children}
          </NotesTabPanel>
        </Tab.Panels>
      </NotesTabsGroup>
    </NotesStateContextProvider>
  )
}
