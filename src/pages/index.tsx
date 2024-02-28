import type {FC} from "react"

import type {ONotesPageOutput} from "../server/trpc/types/note/NotesPageOutput"
import {NoteStatusFilter} from "../server/trpc/types/common/NoteStatusFilter"

import {createServerSidePropsLoader} from "../lib/utils/createPagePropsLoader"
import type {MaybeUndefined} from "../lib/types/MaybeUndefined"
import type {PageDataProps} from "../lib/types/PageDataProps"
import {useSearchParams} from "../lib/hooks/useSearchParams"
import {createCaller} from "../lib/trpc/server"

import {NotesStateContextProvider} from "../contexts/NotesStateContext"

import {BaseLayout} from "../layouts/BaseLayout"

import {NotesView, NotesTabs} from "../views/NotesView"

type PageData = PageDataProps<ONotesPageOutput>

interface SearchParams {
  page?: string
  status?: NoteStatusFilter
}

interface Props extends PageData { }

const getNotes = createCaller(
  async (trpc, params: SearchParams = {}) => trpc.notes.list({
    cursor: params.page,
    filter: params.status ? {status: params.status} : undefined
  })
)

export const getServerSideProps = createServerSidePropsLoader<Props>(
  async ctx => {
    const searchParams = ctx.query as unknown as SearchParams
    const notes = await getNotes(searchParams)

    return {
      props: {
        data: notes
      }
    }
  }
)

const HomePage: FC<Props> = ({data: notes}) => {
  const search = useSearchParams()
  const status = search?.get("status") as MaybeUndefined<NoteStatusFilter>

  return (
    <BaseLayout>
      <div className="w-full mobile:max-w-mobile mobile:mx-auto">
        <NotesTabs active={status} />

        <NotesStateContextProvider data={notes ?? undefined}>
          <NotesView />
        </NotesStateContextProvider>
      </div>
    </BaseLayout>
  )
}

export default HomePage
