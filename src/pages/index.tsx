import {isEmpty} from "lodash"
import type {FC} from "react"

import {router} from "server/trpc/router"
import type {IPoniesPageOutput} from "server/trpc/type/output/PoniesPageOutput"

import {getPageDataStaticProps} from "lib/util/getPageDataStaticProps"
import type {PageDataProps} from "lib/type/PageDataProps"
import {usePageData} from "lib/hook/usePageData"

type PageProps = PageDataProps<IPoniesPageOutput>

export const getStaticProps = getPageDataStaticProps<PageProps>(async () => {
  const trpc = router.createCaller({})

  return {
    props: {
      data: await trpc.ponies.list()
    }
  }
})

const Home: FC = () => {
  const ponies = usePageData<IPoniesPageOutput>()

  return (
    <div className="h-screen w-laptop mx-auto py-5 laptop:w-full laptop:p-5 laptop:mx-0">
      {
        isEmpty(ponies.items) ? (
          <div className="w-full h-full flex justify-center items-center text-slate-400">
            There are no ponies just yet
          </div>
        ) : (
          <div>
            Ponies list will be here
          </div>
        )
      }
    </div>
  )
}

export default Home
