import type {FC, ReactNode} from "react"
import {Dialog} from "@headlessui/react"

import {X} from "lucide-react"

import cn from "clsx"

import {useModalContext} from "./ModalContext"

interface Props {
  className?: string
  children: ReactNode
}

export const ModalTitle: FC<Props> = ({className, children}) => {
  const {close} = useModalContext()

  return (
    <Dialog.Title className={cn("flex p-6 bg-black text-white dark:bg-gray-800 rounded-md overflow-hidden text-xl font-bold select-none", className)}>
      <div>
        {children}
      </div>

      <div className="flex-1" />

      <button type="button" aria-label="Close modal" onClick={close}>
        <X size={28} />
      </button>

    </Dialog.Title>
  )
}
