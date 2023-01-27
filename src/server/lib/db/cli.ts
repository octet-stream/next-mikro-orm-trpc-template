import "server/lib/env"

export default import("./config").then(({getConfig}) => getConfig())
