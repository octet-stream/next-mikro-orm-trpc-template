import type {FC, ReactNode} from "react"
import {Dialog} from "@headlessui/react"

import cn from "clsx"

interface Props {
  className?: string
  children: ReactNode
}

export const ModalPanel: FC<Props> = ({className, children}) => (
  <Dialog.Panel className={cn("flex flex-col w-full mobile:w-mobile overflow-hidden rounded-md text-left align-middle border-8 bg-white border-white text-black dark:bg-slate-700 dark:border-slate-700 dark:text-white", className)}>
    {children}
  </Dialog.Panel>
)
