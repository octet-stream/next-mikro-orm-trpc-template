import type {FC, ComponentPropsWithoutRef} from "react"
import {Plus} from "lucide-react"

import cn from "clsx"

import {Button} from "component/Button"

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "type" | "color"> { }

export const FloatingButton: FC<Props> = ({className, ...props}) => (
  <Button
    {...props}

    type="button"
    shape="circle"
    className={cn("fixed bottom-5 right-5 shadow-md active:shadow-sm", className)}
  >
    <Plus size={32} className="text-white" />
  </Button>
)
