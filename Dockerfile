# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# build the app
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine

WORKDIR /app

# copy only necessary files
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# expose port
EXPOSE 3000

# start app
CMD ["node", "dist/main.js"]