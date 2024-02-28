/** @type {import('next').NextConfig} */
const config = {}

if (process.env.NEXT_RUNS_IN_DOCKER) {
  config.output = "standalone"
}

module.exports = config
