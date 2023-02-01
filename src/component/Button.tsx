/* eslint-disable react/button-has-type */
import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import cn from "clsx"

import {SpinnerCircularFixed} from "spinners-react"

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary"
  color?: "red" | "brand"
  wide?: boolean
  loading?: boolean
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
    loading,
    children,
    disabled,

    ...props
  },

  ref
) => (
  <button
    {...props}

    ref={ref}
    type={type}
    disabled={disabled || loading}
    className={cn(
      "py-2 px-6 rounded-md text-center",

      {
        "w-full": wide,
        "relative cursor-progress": loading,
        "disabled:cursor-not-allowed": disabled && !loading,
        "disabled:bg-gray-400 disabled:dark:bg-slate-600": (variant === "primary" && !loading),
        "disabled:border-gray-300 disabled:text-gray-300 bg-transparent active:disabled:bg-transparent dark:disabled:border-slate-500 dark:disabled:text-slate-500": variant === "secondary",
        "bg-blue-500 active:bg-blue-600 disabled:bg-blue-500 text-white": (!variant || variant === "primary") && (!color || color === "brand"),
        "bg-white active:bg-gray-200 border dark:bg-slate-700 dark:text-white dark:active:bg-slate-600": variant === "secondary",
        "border-gray-200 bg-white active:bg-gray-200 text-black": variant === "secondary" && !color,
        "bg-red-500 active:bg-red-600 text-white": variant === "primary" && color === "red",
        "border-blue-500 text-blue-500 active:bg-blue-200": variant === "secondary" && color === "brand",
        "border-red-500 text-red-500 active:bg-red-100": variant === "secondary" && color === "red"
      },

      className
    )}
  >
    <div className={cn(loading && "invisible")}>
      {children}
    </div>

    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <SpinnerCircularFixed size={24} color="white" secondaryColor="black" speed={200} />
      </div>
    )}
  </button>
))
