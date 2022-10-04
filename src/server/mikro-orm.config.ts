import "server/env"

export default import("./lib/db").then(({getConfig}) => getConfig())
