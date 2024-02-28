import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const BaseLayout: FC<Props> = ({children}) => (
  <main className="w-screen h-screen">
    <div className="min-h-screen w-full lg:max-w-laptop lg:mx-auto lg:py-5 p-5 flex flex-col">
      {children}
    </div>
  </main>
)
