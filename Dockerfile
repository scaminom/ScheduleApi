# Define build arguments
ARG NODE_VERSION=20-alpine3.18
ARG DUMB_INIT_VERSION=1.2.5-r2

# Base stage
FROM node:${NODE_VERSION} AS base

ENV DIR /app
WORKDIR $DIR

# Development stage
FROM base AS dev

ENV NODE_ENV=development

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn prisma generate

# Use build argument for port
ARG PORT=3000
EXPOSE $PORT
CMD ["yarn", "start:dev"]

# Build stage
FROM base AS build

# Use build arguments
ARG DUMB_INIT_VERSION

RUN apk update && apk add --no-cache dumb-init=${DUMB_INIT_VERSION}

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn build && yarn install --production --frozen-lockfile

# Production stage
FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package.json $DIR/yarn.lock ./
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER

# Use build argument for port
ARG PORT=3000
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]
