import {FC} from "react"

import {Card} from "component/Card"
import {NoteCompleteButton} from "component/NoteCompleteButton"

import {NoteNav} from "./NoteNav"
import {NoteTitle} from "./NoteTitle"
import {NoteInfo} from "./NoteInfo"
import {NoteDetails} from "./NoteDetails"
import {NoteFooter} from "./NoteFooter"

export const NoteView: FC = () => (
  <article className="w-full h-full flex items-center justify-center">
    <Card className="w-full p-6 mobile:p-10 mobile:w-mobile mobile:max-w-full mobile:mx-auto">
      <NoteNav />

      <NoteTitle />

      <NoteInfo />

      <NoteDetails />

      <NoteCompleteButton className="mt-10" />

      <NoteFooter />
    </Card>
  </article>
)
