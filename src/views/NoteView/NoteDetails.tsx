import * as prod from "react/jsx-runtime"
import {useMemo} from "react"
import {unified} from "unified"
import type {FC} from "react"

import rehypeSanitize from "rehype-sanitize"
import remarkRehype from "remark-rehype"
import remarkParse from "remark-parse"
import rehypeReact, {Options} from "rehype-react"

import {useNoteStateSnapshot} from "../../contexts/NoteStateContext"
import {Anchor} from "../../components/Anchor"

import {NoteDetailsContent} from "./NoteDetailsContent"
import {NoteNoDetails} from "./NoteNoDetails"

const parser = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeReact, {
    jsx: prod.jsx,
    Fragment: prod.Fragment,
    jsxs: prod.jsxs,
    components: {
      a: Anchor // IDW why it does not like props
    }
  } as Options)

export const NoteDetails: FC = () => {
  const {details} = useNoteStateSnapshot()

  const parsedDetails = useMemo(
    () => details ? parser.processSync(details).result : undefined,

    [details]
  )

  return (
    <div className="mt-5">
      {
        parsedDetails
          ? (
            <NoteDetailsContent>
              {parsedDetails}
            </NoteDetailsContent>
          )
          : <NoteNoDetails />
      }
    </div>
  )
}
