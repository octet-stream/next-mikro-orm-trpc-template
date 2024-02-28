import {Pencil} from "lucide-react"

import type {OpenModalButton} from "components/Modal"

export const Open: OpenModalButton = ({open}) => (
  <button type="button" aria-label="Edit the note" onClick={open}>
    <Pencil size={28} />
  </button>
)
