# Define build arguments
ARG NODE_VERSION=20-alpine3.18
ARG DUMB_INIT_VERSION=1.2.5-r2

# Base stage
FROM node:${NODE_VERSION} AS base
ENV DIR=/app
WORKDIR $DIR
COPY package.json yarn.lock ./

# Development stage
FROM base AS dev
RUN yarn install
COPY . .
RUN yarn prisma generate
ARG PORT=80
EXPOSE $PORT
CMD ["yarn", "start:dev"]

# Build stage
FROM base AS build
ARG DUMB_INIT_VERSION
RUN apk update && apk add --no-cache dumb-init=${DUMB_INIT_VERSION}
COPY . .
RUN yarn install
RUN yarn prisma generate --generator client
RUN yarn build && yarn install --production --frozen-lockfile

# Production stage
FROM node:${NODE_VERSION} AS production
ENV USER=root
WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist
COPY --from=build /app/prisma prisma

# Set user to root (default for Docker containers, so this line is optional)
# USER $USER

ARG PORT=80
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]
