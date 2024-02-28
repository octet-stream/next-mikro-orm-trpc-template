/* eslint-disable react/prop-types */

import {Trash} from "lucide-react"

import type {OpenModalButton} from "components/Modal"

export const Open: OpenModalButton = ({open}) => (
  <button type="button" onClick={open} aria-label="Remove the note">
    <Trash size={28} className="text-red-500 dark:text-red-800" />
  </button>
)
