import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import cn from "clsx"

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary"
  color?: "blue" | "gray"
  wide?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>((
  {
    type = "button",
    className,
    wide,
    variant,
    color,

    ...props
  },

  ref
) => (
  <button
    {...props}

    // eslint-disable-next-line react/button-has-type
    type={type}
    ref={ref}
    className={cn(
      "px-4 py-2 border rounded-md",

      {
        "w-full": wide,
        "bg-blue-800 active:bg-blue-900 border-blue-800 dark:bg-blue-500 dark:active:bg-blue-600 text-white": (!variant || variant === "primary") && (!color || color === "blue"),
        "bg-white active:bg-gray-100 border-gray-200": variant === "secondary" && (!color || color === "gray")
      },

      className
    )}
  />
))
