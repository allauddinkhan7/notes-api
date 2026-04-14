# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /app

# enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

# install deps
RUN pnpm install

COPY . .

RUN pnpm build


# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

# Copy node_modules from builder to ensure all transitive dependencies are available
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]