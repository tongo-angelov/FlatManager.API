FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18 AS final

ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder ./app/dist ./dist

COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 8080

CMD ["node","dist/index.js"]