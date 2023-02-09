/* eslint-disable react/button-has-type */
import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import cn from "clsx"

import {SpinnerCircularFixed} from "spinners-react"

interface BaseProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary"
  color?: "red" | "brand"
  loading?: boolean
}

interface SqareButton {
  wide?: boolean
  shape?: "square"
}

interface CircleButton {
  shape: "circle"
}

type Props = BaseProps & (SqareButton | CircleButton)

const isCircleButton = (props: Props): props is BaseProps & CircleButton => (
  props.shape === "circle"
)

/**
 * Abstract styled `<button>` component
 */
export const Button = forwardRef<HTMLButtonElement, Props>((
  props,

  ref
) => {
  const {
    type = "button",
    shape = "square",
    variant = "primary",
    loading = false,
    className,
    color,
    children,
    disabled,
    wide,

    ...rest
  } = isCircleButton(props) ? {...props, wide: false} : props

  return (
    <button
      {...rest}

      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        "text-center",

        {
          "w-full": wide,
          "py-2 px-6 rounded-md": shape === "square",
          "p-2 rounded-full": shape === "circle",
          "relative cursor-progress": loading,
          "disabled:cursor-not-allowed": disabled && !loading,
          "disabled:bg-gray-400 disabled:dark:bg-slate-600": (variant === "primary" && !loading),
          "disabled:border-gray-300 disabled:text-gray-300 bg-transparent active:disabled:bg-transparent dark:disabled:border-slate-500 dark:disabled:text-slate-500": variant === "secondary",
          "bg-blue-500 active:bg-blue-600 text-white": variant === "primary" && (!color || color === "brand"),
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
  )
})
