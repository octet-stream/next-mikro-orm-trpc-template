import {createElement, Fragment, useMemo} from "react"
import {unified} from "unified"
import type {FC} from "react"

import rehypeSanitize from "rehype-sanitize"
import remarkRehype from "remark-rehype"
import rehypeReact from "rehype-react"
import remarkParse from "remark-parse"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {NoteNoDetails} from "./NoteNoDetails"

const parser = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeReact, {createElement, Fragment})

export const NoteDetails: FC = () => {
  const {details} = useNoteStateSnapshot()

  const parsedDetails = useMemo(
    () => details ? parser.processSync(details).result : undefined,

    [details]
  )

  return (
    <div className="mt-5">
      {parsedDetails ?? <NoteNoDetails />}
    </div>
  )
}
