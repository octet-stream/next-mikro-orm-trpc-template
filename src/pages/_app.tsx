import {Toaster} from "react-hot-toast"
import type {AppProps} from "next/app"
import {Fragment} from "react"
import type {FC} from "react"

import Head from "next/head"

import "style/tailwind.css"

import {PageDataProvider} from "lib/context/PageDataContext"
import type {SerializedPageDataProps} from "lib/type/PageDataProps"

interface PageProps extends SerializedPageDataProps { }

interface Props extends AppProps<PageProps> { }

const PageContainer: FC<Props> = ({Component, pageProps}) => (
  <Fragment>
    <Head>
      <title>Next.js template with Mikro ORM and tRPC</title>
    </Head>

    <PageDataProvider data={pageProps.data}>
      <Component {...pageProps} />

      <Toaster position="top-center" />
    </PageDataProvider>
  </Fragment>
)

export default PageContainer
