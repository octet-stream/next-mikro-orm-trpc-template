/* eslint-disable react/button-has-type */
import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import cn from "clsx"

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary"
  color?: "red" | "brand"
  wide?: boolean
}

/**
 * Abstract styled `<button>` component
 */
export const Button = forwardRef<HTMLButtonElement, Props>((
  {
    type = "button",
    className,
    variant,
    color,
    wide,

    ...props
  },

  ref
) => (
  <button
    {...props}

    ref={ref}
    type={type}
    className={cn(
      "py-2 px-6 rounded-md text-center disabled:cursor-not-allowed",

      {
        "w-full": wide,
        "disabled:bg-gray-400 disabled:dark:bg-slate-600": variant === "primary",
        "disabled:border-gray-300 disabled:text-gray-300 bg-transparent active:disabled:bg-transparent dark:disabled:border-slate-500 dark:disabled:text-slate-500": variant === "secondary",
        "bg-blue-500 active:bg-blue-600 text-white": (!variant || variant === "primary") && (!color || color === "brand"),
        "bg-white active:bg-gray-200 border dark:bg-slate-700 dark:text-white dark:active:bg-slate-600": variant === "secondary",
        "border-gray-200 bg-white active:bg-gray-200 text-black": variant === "secondary" && !color,
        "bg-red-500 active:bg-red-600 text-white": variant === "primary" && color === "red",
        "border-blue-500 text-blue-500 active:bg-blue-200": variant === "secondary" && color === "brand",
        "border-red-500 text-red-500 active:bg-red-100": variant === "secondary" && color === "red"
      },

      className
    )}
  />
))
