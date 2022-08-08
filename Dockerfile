FROM node:16.16-bullseye-slim as base

ENV NODE_ENV production

# Install all including dev deps
FROM base as deps
WORKDIR /app
ADD package.json ./
RUN npm install --production=false

# Prod node_modules only 
FROM base as prod-deps
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
RUN npm prune --production

# build the app
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Create slim final build
FROM base
ENV NODE_ENV="production"
WORKDIR /app

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json

CMD ["node", "build/index.js"]