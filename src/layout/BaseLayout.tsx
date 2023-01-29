import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const BaseLayout: FC<Props> = ({children}) => (
  <main className="h-screen w-screen p-5 laptop:mx-auto laptop:max-w-laptop laptop:px-0">
    {children}
  </main>
)
