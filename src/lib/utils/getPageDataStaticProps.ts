import type {GetStaticProps, PreviewData} from "next"
import type {ParsedUrlQuery} from "querystring"
import {stringify} from "superjson"

import type {
  PageDataProps,
  SerializedPageDataProps
} from "lib/types/PageDataProps"

export interface GetPageDataStaticProps {
  <
    P extends PageDataProps = PageDataProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  >(
    fn: GetStaticProps<P, Q, D>
  ): GetStaticProps<Omit<P, "data"> & SerializedPageDataProps, Q, D>
}

// TODO: Make universal serialization function for getStaticProps and getServerSideProps
export const getPageDataStaticProps: GetPageDataStaticProps = fn => async (
  ...args
) => {
  const result = await fn(...args)

  if (!("props" in result)) {
    return result
  }

  let data: string | undefined
  if (result.props.data) {
    data = stringify(result.props.data)
  }

  return {
    ...result,

    props: {
      ...result.props,

      data
    }
  }
}
