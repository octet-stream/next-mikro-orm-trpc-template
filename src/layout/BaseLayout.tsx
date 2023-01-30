import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const BaseLayout: FC<Props> = ({children}) => (
  <main className="h-screen min-h-screen lg:w-screen lg:max-w-laptop lg:mx-auto lg:py-5 w-full p-5">
    {children}
  </main>
)
