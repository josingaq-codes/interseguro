FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY .env ./
EXPOSE 4001
CMD ["node", "dist/index.js"]