import {TRPCError} from "@trpc/server"
import type {FC} from "react"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import {patchStaticPaths} from "lib/util/patchStaticPaths"
import type {PageDataProps} from "lib/type/PageDataProps"

import {Note} from "server/db/entity"
import {getORM} from "server/lib/db/orm"
import {router} from "server/trpc/router"
import type {TNoteOutput} from "server/trpc/type/output/NoteOutput"

import {NoteStateContextProvider} from "context/NoteStateContext"

import {BaseLayout} from "layout/BaseLayout"

import {NoteView} from "view/NoteView/NoteView"

export const getStaticPaths = patchStaticPaths(async () => {
  const orm = await getORM()

  const notes = await orm.em.find(
    Note,

    {},

    {
      disableIdentityMap: true,
      fields: ["id"],
      limit: 1000,
      orderBy: {
        createdAt: "desc"
      }
    }
  )

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
  <NoteStateContextProvider data={note}>
    <BaseLayout>
      <NoteView />
    </BaseLayout>
  </NoteStateContextProvider>
)

export default NoteViewPage
