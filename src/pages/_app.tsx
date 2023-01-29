import {Fragment, useMemo} from "react"
import {Toaster} from "react-hot-toast"
import type {AppProps} from "next/app"
import {parse} from "superjson"
import type {FC} from "react"

import Head from "next/head"
import isString from "lodash/isString"

import "style/tailwind.css"

import type {SerializedPageDataProps} from "lib/type/PageDataProps"

interface PageProps extends SerializedPageDataProps { }

interface Props extends AppProps<PageProps> { }

const PageContainer: FC<Props> = ({Component, pageProps}) => {
  const data = useMemo<unknown>(
    () => isString(pageProps.data) ? parse(pageProps.data) : pageProps.data,

    [pageProps.data]
  )

  return (
    <Fragment>
      <Head>
        <title>Next.js template with Mikro ORM and tRPC</title>
      </Head>

      <Component {...pageProps} data={data} />

      <Toaster position="top-center" />
    </Fragment>
  )
}

export default PageContainer
