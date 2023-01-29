import {Plus} from "lucide-react"
import {isEmpty} from "lodash"
import type {FC} from "react"

import Link from "next/link"

import {router} from "server/trpc/router"
import type {IPoniesPageOutput} from "server/trpc/type/output/PoniesPageOutput"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import type {PageDataProps} from "lib/type/PageDataProps"

import {PonyDataProvider} from "context/PonyDataContext"
import {PoniesDataProvider} from "context/PoniesDataContext"

import {FloatingButton} from "component/FloatingButton"
import {PonyCard} from "component/PonyCard"

type PageData = PageDataProps<IPoniesPageOutput>

export const getStaticProps = getPageDataStaticProps<PageData>(async () => {
  const trpc = router.createCaller({})

  return {
    props: {
      data: await trpc.ponies.list()
    }
  }
})

interface Props extends PageData { }

const HomePage: FC<Props> = ({data: ponies}) => (
  <PoniesDataProvider data={ponies}>
    <div className="min-h-screen lg:w-screen lg:max-w-laptop lg:mx-auto lg:py-5 w-full p-5">
      {isEmpty(ponies.items) ? (
        <div className="w-full h-full flex flex-col justify-center items-center text-slate-400 select-none">
          <div>There are no ponies just yet</div>
          <div>To add one, click on the button down below</div>

          <Link href="/new" role="button">
            <Plus size={32} className="mt-4" />
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-2 mobile:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {ponies.items.map(pony => (
            <li key={pony.id}>
              <PonyDataProvider data={pony}>
                <PonyCard />
              </PonyDataProvider>
            </li>
          ))}
        </ul>
      )}

      <FloatingButton />
    </div>
  </PoniesDataProvider>
)

export default HomePage
