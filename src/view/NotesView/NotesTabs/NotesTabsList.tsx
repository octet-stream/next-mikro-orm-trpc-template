import {Tab} from "@headlessui/react"
import type {FC} from "react"

import {filters} from "./tabs"

export const NotesTabsList: FC = () => (
  <Tab.List className="mb-5 w-full bg-black text-white dark:bg-slate-800 rounded-md">
    {filters.map(([key, name]) => (
      <Tab key={key} className="px-2 py-4 first:pl-4 last:pr-4 ui-selected:underline">
        {name}
      </Tab>
    ))}
  </Tab.List>
)
