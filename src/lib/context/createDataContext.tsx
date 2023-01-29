"use client"

import {createContext, useContext, useMemo} from "react"
import type {FC, ReactNode} from "react"
import {parse} from "superjson"

import isString from "lodash/isString"

import type {MaybeUndefined} from "lib/type/MaybeUndefined"

interface Props<T extends Record<string, unknown>> {
  data: T | string
  children: ReactNode
}

export function createDataContext<T extends Record<string, unknown> = {}>() {
  const Context = createContext<MaybeUndefined<T>>(undefined)

  function useDataContext(): T {
    const data = useContext(Context)

    if (!data) {
      throw new Error("Can't get access to the context")
    }

    return data
  }

  const DataContextProvider: FC<Props<T>> = ({data, children}) => {
    const parsed = useMemo<T>(() => isString(data) ? parse(data) : data, [data])

    return (
      <Context.Provider value={parsed}>
        {children}
      </Context.Provider>
    )
  }

  return {useDataContext, DataContextProvider, Context} as const
}
