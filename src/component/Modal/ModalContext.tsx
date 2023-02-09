import {createContext, useContext} from "react"

import type {ModalRef} from "./Modal"

export const ModalContext = createContext<ModalRef | undefined>(undefined)

export function useModalContext(): ModalRef {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("Can't find ModalContext")
  }

  return context
}
