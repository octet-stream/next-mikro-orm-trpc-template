/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true
  }
}

if (process.env.NEXT_RUNS_IN_DOCKER) {
  config.output = "standalone"
}

module.exports = config
