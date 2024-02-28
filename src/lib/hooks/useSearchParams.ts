import {useRouter} from "next/router"
import {useMemo} from "react"

export function useSearchParams(): URLSearchParams | null {
  const router = useRouter()

  return useMemo<URLSearchParams | null>(() => {
    const {searchParams} = new URL(router.asPath, "https://localhost")

    if (!searchParams.size) {
      return null
    }

    return searchParams
  }, [router.asPath])
}
