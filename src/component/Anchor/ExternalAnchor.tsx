import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

type Props = Omit<ComponentPropsWithoutRef<"a">, "rel">

export const ExternalAnchor = forwardRef<HTMLAnchorElement, Props>(({
  children,
  target = "_blank",

  ...props
}, ref) => (
  <a {...props} ref={ref} target={target} rel="noopener noreferrer">
    {children}
  </a>
))
