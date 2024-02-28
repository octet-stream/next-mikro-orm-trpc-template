import type {Entries} from "type-fest"
import {Fragment} from "react"
import type {FC} from "react"

import Head from "next/head"

import {
  NoteStatusFilter,
  NoteStatusFilterNames
} from "../../server/trpc/types/common/NoteStatusFilter"

import {NotesTab} from "./NotesTab"

const filters = Object.entries(
  NoteStatusFilterNames
) as Entries<typeof NoteStatusFilterNames>

interface Props {
  active?: NoteStatusFilter
}

export const NotesTabs: FC<Props> = ({active = NoteStatusFilter.ALL}) => (
  <Fragment>
    <Head>
      <title>
        {`${NoteStatusFilterNames[active]} | Simple Notes`}
      </title>
    </Head>

    <ul className="mb-5 w-full flex bg-black text-white dark:bg-slate-800 rounded-md">
      {filters.map(([status, name]) => (
        <li key={status}>
          <NotesTab name={name} status={status} active={active === status} />
        </li>
      ))}
    </ul>
  </Fragment>
)
