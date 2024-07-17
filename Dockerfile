FROM node:20-alpine3.18 AS base

ENV DIR /app
WORKDIR $DIR

FROM base AS dev

ENV NODE_ENV=development

COPY package.json yarn.lock ./

RUN yarn install

COPY ./prisma ./prisma
RUN yarn prisma generate


COPY tsconfig*.json .
COPY nest-cli.json .
COPY src src

EXPOSE $PORT
CMD ["yarn", "start:dev"]

FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r2

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .
COPY src src

RUN yarn build && \
  yarn install --production --frozen-lockfile

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package.json $DIR/yarn.lock ./
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]
