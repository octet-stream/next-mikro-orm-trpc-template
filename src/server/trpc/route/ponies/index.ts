import {router} from "server/trpc/def"

import list from "./list"

const ponies = router({
  list
})

export default ponies
