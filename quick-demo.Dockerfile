FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /quick-demo

RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

FROM base as build
WORKDIR /quick-demo

# Expose env variables for mikro-orm CLI and the app
ENV MIKRO_ORM_DB_NAME quick-demo
ENV MIKRO_ORM_HOST host.docker.internal
ENV MIKRO_ORM_PORT 3308
ENV MIKRO_ORM_USER root
ENV MIKRO_ORM_PASSWORD=

ENV NODE_ENV production
ENV NEXT_RUNS_IN_DOCKER 1
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps /quick-demo/node_modules ./node_modules
COPY . .

# Run migrations
RUN npm exec -- mikro-orm database:create
RUN npm exec -- mikro-orm migration:fresh

# Build the app
RUN npm run build

FROM base as run
WORKDIR /quick-demo

ENV MIKRO_ORM_DB_NAME quick-demo
ENV MIKRO_ORM_HOST host.docker.internal
ENV MIKRO_ORM_PORT 3308
ENV MIKRO_ORM_USER root
ENV MIKRO_ORM_PASSWORD=

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_RUNS_IN_DOCKER 1
ENV NODE_ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 node-quick-demo
RUN adduser --system --uid 1001 quick-demo

COPY --from=build /quick-demo/public ./public
COPY --from=build --chown=quick-demo:node-quick-demo /quick-demo/.next/standalone ./
COPY --from=build --chown=quick-demo:node-quick-demo /quick-demo/.next/static ./.next/static

USER quick-demo
EXPOSE 3000

CMD ["node", "server.js"]
