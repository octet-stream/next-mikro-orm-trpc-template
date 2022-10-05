import {QueryClient, QueryClientProvider} from "react-query"
import {useState, Fragment} from "react"
import type {AppProps} from "next/app"
import type {FC} from "react"

import Head from "next/head"

import {trpcClient, TRPCProvider} from "lib/trpc"

import "style/globals.css"
import "style/tailwind.css"

interface Props extends AppProps { }

const MyApp: FC<Props> = ({Component, pageProps}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Fragment>
      <Head>
        <title>Next.js template with Mikro ORM and tRPC</title>
      </Head>

      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </TRPCProvider>
    </Fragment>
  )
}

export default MyApp
