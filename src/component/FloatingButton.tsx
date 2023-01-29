import {Plus} from "lucide-react"
import type {FC} from "react"

import cn from "clsx"

import {Button} from "component/Button"

interface Props {
  className?: string
}

export const FloatingButton: FC<Props> = ({className, ...props}) => (
  <Button
    {...props}

    className={cn("fixed bottom-5 right-5 bg-blue-900 active:bg-blue-800 px-2 py-2 rounded-full shadow-md active:shadow-sm", className)}
  >
    <Plus size={32} className="text-white" />
  </Button>
)
