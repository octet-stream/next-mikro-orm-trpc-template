import type {GetServerSideProps} from "next"
import {TRPCError} from "@trpc/server"
import type {FC} from "react"

import type {ONotesPageOutput} from "server/trpc/type/output/NotesPageOutput"
import {NoteStatusFilter} from "server/trpc/type/common/NoteStatusFilter"

import type {MaybeUndefined} from "lib/type/MaybeUndefined"
import type {PageDataProps} from "lib/type/PageDataProps"
import {useSearchParams} from "lib/hook/useSearchParams"
import {createCaller} from "lib/trpc/server"

import {NotesStateContextProvider} from "context/NotesStateContext"

import {BaseLayout} from "layout/BaseLayout"

import {NotesView, NotesTabs} from "view/NotesView"

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

// TODO Add helper with TRPCError handler
export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const searchParams = ctx.query as unknown as SearchParams

  try {
    const notes = await getNotes(searchParams)

    return {
      props: {
        data: notes
      }
    }
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      return {
        notFound: true
      }
    }

    throw error
  }
}

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
