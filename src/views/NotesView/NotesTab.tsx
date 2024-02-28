import type {ValueOf} from "type-fest"
import {useRouter} from "next/router"
import type {FC} from "react"
import {useMemo} from "react"

import Link from "next/link"
import cn from "clsx"

import {
  NoteStatusFilter,
  NoteStatusFilterNames
} from "../../server/trpc/types/common/NoteStatusFilter"

import {useSearchParams} from "../../lib/hooks/useSearchParams"

interface Props {
  name: ValueOf<typeof NoteStatusFilterNames>
  status: NoteStatusFilter
  active: boolean
}

export const NotesTab: FC<Props> = ({active, name, status}) => {
  const router = useRouter()
  const search = useSearchParams()

  const link = useMemo<string>(() => {
    const result = new URLSearchParams(search ?? [])

    if (status) {
      result.set("status", status)
    }

    // Reset page counter
    if (result.has("page")) {
      result.set("page", "1")
    }

    return [router.pathname || "/", result.toString()].filter(Boolean).join("?")
  }, [status, router.pathname, search])

  return (
    <Link replace href={link} className={cn("px-2 py-4 first:pl-4 last:pr-4 block", {underline: active, "no-underline": !active})}>
      {name}
    </Link>
  )
}
