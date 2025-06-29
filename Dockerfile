FROM node:20 AS builder
WORKDIR /app
RUN corepack enable
RUN corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
COPY .yarnrc.yml* ./
COPY .yarn/ .yarn/

COPY blocksuite blocksuite
COPY packages packages
COPY packages/frontend/apps packages/frontend/apps
COPY tools tools
COPY docs/reference docs/reference
COPY tests tests

RUN yarn install --immutable

COPY . .

# Build the web app
RUN yarn workspace @affine/web build

FROM node:20-slim
WORKDIR /app

# Install serve for static file serving
RUN npm install -g serve

COPY --from=builder /app/packages/frontend/apps/web/dist ./dist
COPY tenants.json ./tenants.json

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
