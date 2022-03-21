FROM node:lts-alpine

WORKDIR /app

RUN npm install -g npm@8.5.5

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
RUN npm run install-server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

EXPOSE 8000

ENV MONGO_URL=mongodb://c-mongo-db:27017/nasa-db

CMD [ "npm", "start", "--prefix", "server" ]
