import {ArrowLeft} from "lucide-react"
import type {FC} from "react"

import Link from "next/link"

import {NoteUpdateModal} from "../../components/NoteModal/NoteUpdateModal"
import {useNoteStateSnapshot} from "../../contexts/NoteStateContext"

import {NoteRestoreButton} from "./NoteRestoreButton"

export const NoteNav: FC = () => {
  const {isRejected} = useNoteStateSnapshot()

  return (
    <nav className="flex w-full mb-10">
      <Link href="/" aria-label="Home page">
        <ArrowLeft size={28} />
      </Link>

      <div className="flex-1" />

      {isRejected ? <NoteRestoreButton /> : <NoteUpdateModal />}
    </nav>
  )
}
