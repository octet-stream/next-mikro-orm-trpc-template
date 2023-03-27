/* eslint-disable indent */

import type {GetServerSideProps, GetStaticProps, PreviewData} from "next"
import {TRPCError} from "@trpc/server"

import type {ParsedUrlQuery} from "querystring"

function assertError(error: unknown): true {
  if (error instanceof TRPCError && error.code === "NOT_FOUND") {
    return true
  }

  throw error
}

export const createServerSidePropsLoader = <
  TProps extends object,
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
>(
  loader: GetServerSideProps<TProps, TQuery, TPreview>
): GetServerSideProps<TProps, TQuery, TPreview> => async (...args) => {
  try {
    return await loader(...args)
  } catch (error) {
    return {notFound: assertError(error)}
  }
}

export const createStaticPropsLoader = <
  TProps extends object,
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
>(
  loader: GetStaticProps<TProps, TQuery, TPreview>
): GetStaticProps<TProps, TQuery, TPreview> => async (...args) => {
  try {
    return await loader(...args)
  } catch (error) {
    return {notFound: assertError(error)}
  }
}
