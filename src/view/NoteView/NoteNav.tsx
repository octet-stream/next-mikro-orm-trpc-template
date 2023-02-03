import {ArrowLeft} from "lucide-react"
import type {FC} from "react"

import Link from "next/link"

import {NoteUpdateModal} from "component/NoteModal/NoteUpdateModal"

export const NoteNav: FC = () => (
  <nav className="flex w-full mb-10">
    <Link href="/">
      <ArrowLeft size={28} />
    </Link>

    <div className="flex-1" />

    <NoteUpdateModal />
  </nav>
)
