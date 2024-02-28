import type {OpenModalButton} from "components/Modal"

import {FloatingButton} from "components/FloatingButton"

export const Open: OpenModalButton = ({open}) => (
  <FloatingButton onClick={open} aria-label="Create a note" />
)
