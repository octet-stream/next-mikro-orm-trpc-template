import {ArrowLeft} from "lucide-react"
import {FC} from "react"

import Link from "next/link"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {Card} from "component/Card"
import {NoteControls} from "component/NoteControls"
import {NoteRemoveDialog} from "component/NoteRemoveDialog"
import {NoteUpdateModal} from "component/NoteModal/NoteUpdateModal"
import {NoteCompleteButton} from "component/NoteCompleteButton"

import {NoteInfo} from "./NoteInfo"

export const NoteView: FC = () => {
  const {title, details} = useNoteStateSnapshot()

  return (
    <article className="w-full h-full flex items-center justify-center">
      <Card className="w-full p-6 mobile:p-10 mobile:w-mobile mobile:max-w-full mobile:mx-auto">
        <nav className="flex w-full mb-10">
          <Link href="/">
            <ArrowLeft size={28} />
          </Link>

          <div className="flex-1" />

          <NoteUpdateModal />
        </nav>

        <h2 className="text-3xl">
          {title}
        </h2>

        <NoteInfo />

        <div className="mt-5">
          {
            details ? (
              <p>
                {details}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-gray-600">
                No details
              </p>
            )
          }
        </div>

        <NoteCompleteButton className="mt-10" />

        <div className="flex flex-row mt-10">
          <NoteControls />

          <div className="flex-1" />

          <NoteRemoveDialog />
        </div>
      </Card>
    </article>
  )
}
