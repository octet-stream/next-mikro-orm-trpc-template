import {TRPCError} from "@trpc/server"
import {ArrowLeft} from "lucide-react"
import type {FC} from "react"

import Link from "next/link"
import relative from "date-fns/formatRelative"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import {patchStaticPaths} from "lib/util/patchStaticPaths"
import type {PageDataProps} from "lib/type/PageDataProps"

import {Note} from "server/db/entity"
import {router} from "server/trpc/router"
import {runIsolatied} from "server/lib/db/orm"
import type {TNoteOutput} from "server/trpc/type/output/NoteOutput"

import {NoteDataContextProvider} from "context/NoteDataContext"

import {BaseLayout} from "layout/BaseLayout"

import {Card} from "component/Card"
import {NoteControls} from "component/NoteControls"
import {NoteRemoveDialog} from "component/NoteRemoveDialog"
import {NoteUpdateModal} from "component/NoteModal/NoteUpdateModal"

export const getStaticPaths = patchStaticPaths(async () => {
  const notes = await runIsolatied(async em => em.find(
    Note,

    {},

    {
      fields: ["id"],
      limit: 1000,
      orderBy: {
        createdAt: "desc"
      }
    }
  ))

  return {
    fallback: "blocking",
    paths: notes.map(({id}) => ({params: {id}}))
  }
})

interface Params {
  id: string
}

type PageData = PageDataProps<TNoteOutput>

export const getStaticProps = getPageDataStaticProps<PageData>(async ctx => {
  const {id} = ctx.params as unknown as Params

  const trpc = router.createCaller({})

  try {
    return {
      props: {
        data: await trpc.note.getById({id})
      }
    }
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      return {notFound: true}
    }

    throw error
  }
})

interface Props extends PageData { }

const NoteViewPage: FC<Props> = ({data: note}) => (
  <NoteDataContextProvider data={note}>
    <BaseLayout>
      <article className="w-full h-full flex items-center justify-center">
        <Card className="w-full p-6 mobile:p-10 mobile:w-mobile mobile:max-w-full mobile:mx-auto">
          <nav className="flex w-full mb-10">
            <Link href="/">
              <ArrowLeft size={28} />
            </Link>

            <div className="flex-1" />

            <NoteUpdateModal />
          </nav>

          <h2 className="text-3xl">
            {note.title}
          </h2>

          <small className="text-gray-400 dark:text-gray-600">
            noted {relative(note.createdAt, Date.now())}
          </small>

          <div className="mt-5">
            {
              note.details ? (
                <p>
                  {note.details}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-600">
                  No details
                </p>
              )
            }
          </div>

          <div className="flex flex-row mt-10">
            <NoteControls />

            <div className="flex-1" />

            <div className="border-r border-gray-400 dark:border-gray-700 mr-4" />

            <NoteRemoveDialog />
          </div>
        </Card>
      </article>
    </BaseLayout>
  </NoteDataContextProvider>
)

export default NoteViewPage
