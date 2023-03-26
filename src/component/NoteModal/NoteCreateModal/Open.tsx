import type {OpenModalButton} from "component/Modal"

import {FloatingButton} from "component/FloatingButton"

export const Open: OpenModalButton = ({open}) => (
  <FloatingButton onClick={open} aria-label="Create a note" />
)
