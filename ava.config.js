module.exports = {
  failFast: true,
  extensions: ["ts", "tsx"],
  files: ["src/**/*.test.{ts,tsx}"],
  require: [
    "global-jsdom/register",
    "ts-node/register/transpile-only",
    "reflect-metadata",
    "./src/server/env.ts",
    "./src/server/__helper__/polyfills.ts"
  ],
  environmentVariables: {
    "TS_NODE_PROJECT": "tsconfig.ava.json"
  }
}
