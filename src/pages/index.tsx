import {isEmpty} from "lodash"
import type {FC} from "react"

import {router} from "server/trpc/router"
import type {TNotesPageOutput} from "server/trpc/type/output/NotesPageOutput"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import type {PageDataProps} from "lib/type/PageDataProps"

import {BaseLayout} from "layout/BaseLayout"

import {NoteDataContextProvider} from "context/NoteDataContext"
import {NotesDataContextProvider} from "context/NotesDataContext"

import {NoteCreateModal} from "component/NoteModal"
import {NoteCard} from "component/NoteCard"

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
    <NotesDataContextProvider data={notes}>
      {isEmpty(notes.items) ? (
        <div className="w-full h-full flex justify-center items-center select-none">
          <div className="border rounded-md text-gray-400 border-gray-400 dark:text-slate-500 dark:border-slate-500 p-5 text-center">
            <div>There are no notes just yet</div>
            <div>To add one, click on the button down below</div>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-2 mobile:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {notes.items.map(note => (
            <li key={note.id}>
              <NoteDataContextProvider data={note}>
                <NoteCard />
              </NoteDataContextProvider>
            </li>
          ))}
        </ul>
      )}

      <NoteCreateModal />
    </NotesDataContextProvider>
  </BaseLayout>
)

export default HomePage
