import {useRouter} from "next/router"
import {useMemo} from "react"

import isEmpty from "lodash/isEmpty"

export function useSearchParams(): URLSearchParams | null {
  const router = useRouter()

  return useMemo<URLSearchParams | null>(() => {
    const {searchParams} = new URL(router.asPath, "https://localhost")

    if (isEmpty([...searchParams])) {
      return null
    }

    return searchParams
  }, [router.asPath])
}
