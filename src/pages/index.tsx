import type {FC} from "react"

import {router} from "server/trpc/router"
import type {TNotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import type {PageDataProps} from "lib/type/PageDataProps"

import {BaseLayout} from "layout/BaseLayout"

import {NotesTabs, NotesView} from "view/NotesView"

type PageData = PageDataProps<TNotesPageOutput>

export const getStaticProps = getPageDataStaticProps<PageData>(async () => {
  const trpc = router.createCaller({})

  return {
    props: {
      data: await trpc.notes.list()
    }
  }
})

interface Props extends PageData { }

const HomePage: FC<Props> = ({data: notes}) => (
  <BaseLayout>
    <NotesTabs initialNotes={notes}>
      <NotesView />
    </NotesTabs>
  </BaseLayout>
)

export default HomePage
