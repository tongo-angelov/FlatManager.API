FROM node:18

ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci --omit=dev

COPY /dist /usr/src/app

EXPOSE 8080

CMD ["node","index.js"]