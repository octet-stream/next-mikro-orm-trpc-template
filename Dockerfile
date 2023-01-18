FROM node:18

RUN npm i -g pnpm@7

RUN mkdir -p /usr/src/demo
WORKDIR /usr/src/demo

COPY package.json /usr/src/demo
COPY pnpm-lock.yaml /usr/src/demo

RUN pnpm install --frozen-lockfile

COPY . /usr/src/demo

RUN pnpm exec next telemetry disable

EXPOSE 3000
