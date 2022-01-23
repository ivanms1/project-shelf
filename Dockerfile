FROM node:16.3.0-alpine AS build

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY apps/api/package.json /app
COPY apps/api/src/prisma/schema.prisma /app/src/prisma/schema.prisma
RUN npm install -g ts-node
RUN npm install -g typescript
RUN yarn
RUN npx prisma generate

# Bundle app source
COPY . /app
RUN yarn build

FROM node:16.3.0-alpine

WORKDIR /app

COPY apps/api/package.json /app
RUN yarn --production
COPY apps/api/src/prisma /app/src/prisma
RUN npx prisma generate

COPY --from=0 /app/dist /app/dist

EXPOSE 8080
CMD [ "yarn", "start" ]