import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const BaseLayout: FC<Props> = ({children}) => (
  <main className="h-screen w-laptop mx-auto py-5 laptop:w-full laptop:p-5 laptop:mx-0">
    {children}
  </main>
)
