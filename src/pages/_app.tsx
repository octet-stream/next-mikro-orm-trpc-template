import type {AppProps} from "next/app"
import {Fragment} from "react"
import type {FC} from "react"

import Head from "next/head"

import "style/globals.css"
import "style/tailwind.css"

interface Props extends AppProps { }

const PageContainer: FC<Props> = ({Component, pageProps}) => (
  <Fragment>
    <Head>
      <title>Next.js template with Mikro ORM and tRPC</title>
    </Head>

    <Component {...pageProps} />
  </Fragment>
)

export default PageContainer
