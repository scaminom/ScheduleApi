# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Prisma
RUN npx prisma generate

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "run", "start:dev"]
