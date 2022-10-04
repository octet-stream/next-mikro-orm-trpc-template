import type {AppProps} from "next/app"
import type {FC} from "react"

import "style/globals.css"

interface Props extends AppProps { }

const MyApp: FC<Props> = ({Component, pageProps}) => (
  <Component {...pageProps} />
)

export default MyApp
