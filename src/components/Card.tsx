import type {FC, ReactNode} from "react"

import cn from "clsx"

interface Props {
  className?: string
  children: ReactNode
}

export const Card: FC<Props> = ({className, children}) => (
  <div className={cn("bg-gray-50 dark:bg-slate-800 dark:text-white shadow-md rounded-md", className)}>
    {children}
  </div>
)
