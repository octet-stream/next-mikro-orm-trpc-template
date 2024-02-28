import {TRPCError} from "@trpc/server"
import {Fragment} from "react"
import type {FC} from "react"

import Head from "next/head"

import {getPageDataStaticProps} from "../../lib/utils/getPageDataStaticProps"
import {patchStaticPaths} from "../../lib/utils/patchStaticPaths"
import type {PageDataProps} from "../../lib/types/PageDataProps"

import {Note} from "../../server/db/entities"

import {getORM} from "../../server/lib/db/orm"
import {router} from "../../server/trpc/router"
import type {ONoteOutput} from "../../server/trpc/types/note/NoteOutput"

import {NoteStateContextProvider} from "../../contexts/NoteStateContext"
import {FakeNotesContext} from "../../contexts/FakeNotesContext"

import {BaseLayout} from "../../layouts/BaseLayout"

import {NoteCreateModal} from "../../components/NoteModal"
import {NoteView} from "../../views/NoteView"

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

type PageData = PageDataProps<ONoteOutput>

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
  <Fragment>
    <Head>
      <title>
        {`${note.title} | Simple Notes`}
      </title>
    </Head>
    <NoteStateContextProvider data={note}>
      <BaseLayout>
        <NoteView />
      </BaseLayout>
    </NoteStateContextProvider>

    <FakeNotesContext>
      <NoteCreateModal redirect />
    </FakeNotesContext>
  </Fragment>
)

export default NoteViewPage
