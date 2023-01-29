import {Plus} from "lucide-react"
import {isEmpty} from "lodash"
import type {FC} from "react"

import Link from "next/link"

import {router} from "server/trpc/router"
import {PonyRaceNames} from "server/trpc/type/common/PonyRace"
import type {IPoniesPageOutput} from "server/trpc/type/output/PoniesPageOutput"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import type {PageDataProps} from "lib/type/PageDataProps"

import {PoniesDataProvider} from "context/PoniesDataContext"

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
    <div className="h-screen w-laptop mx-auto py-5 laptop:w-full laptop:p-5 laptop:mx-0">
      {isEmpty(ponies.items) ? (
        <div className="w-full h-full flex flex-col justify-center items-center text-slate-400 select-none">
          <div>There are no ponies just yet</div>
          <div>To add one, click on the button down below</div>

          <Link href="/new" role="button">
            <Plus size={32} className="mt-4" />
          </Link>
        </div>
      ) : (
        <ul>
          {ponies.items.map(pony => (
            <li key={pony.id}>
              {pony.name} ({PonyRaceNames[pony.race]})
            </li>
          ))}
        </ul>
      )}
    </div>
  </PoniesDataProvider>
)

export default HomePage
