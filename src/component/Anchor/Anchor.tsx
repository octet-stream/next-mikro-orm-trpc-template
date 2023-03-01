import type {ComponentPropsWithoutRef} from "react"
import {forwardRef, useMemo} from "react"

import Link from "next/link"
import cn from "clsx"

import {isInternalUrl} from "lib/util/isInternalUrl"

import {ExternalAnchor} from "component/Anchor/ExternalAnchor"

interface Props extends ComponentPropsWithoutRef<"a"> {
  href: string
}

/**
 * Abstract Anchor component.
 * Will automatically render `next/link` for internal URL and `<a>` for external.
 *
 * ```tsx
 * import type {FC} from "react"
 * import {Fragment} from "react"
 * import {Anchor} from "component/Anchor"
 *
 * // Assume our internal base URL is https://example.com, then the first link will be `next/link` component and the other will be `<a>` tag
 * const MyComponent: FC = () => (
 *   <Fragment>
 *     <Anchor href="https://example.com">
 *       Internal link
 *     </Anchor>
 *
 *     <Anchor href="https://external-site.com">
 *       External link
 *     </Anchor>
 *   </Fragment>
 * )
 * ```
 */
export const Anchor = forwardRef<HTMLAnchorElement, Props>(({
  className,

  ...props
}, ref) => {
  const AnchorComponent = useMemo(
    () => isInternalUrl(props.href) ? Link : ExternalAnchor,

    [props.href]
  )

  return (
    <AnchorComponent
      {...props}

      ref={ref}
      className={cn("dark:text-white", className)}
    />
  )
})
