import type {FC} from "react"

import Link from "next/link"

import {BaseLayout} from "../layouts/BaseLayout"

const NotFound: FC = () => (
  <BaseLayout>
    <div className="w-full h-full flex flex-col justify-center items-center text-center">
      <div className="text-8xl font-bold">
        404
      </div>

      <div className="mt-1">
        Couldn&apos;d find the page you are looking for.
      </div>

      <div>
        You can try and check the page&apos;s address, or return to the <Link href="/" className="underline" replace>home page</Link>.
      </div>
    </div>
  </BaseLayout>
)

export default NotFound
