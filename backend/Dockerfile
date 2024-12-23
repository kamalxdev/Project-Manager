FROM node:20

WORKDIR /backend

COPY *.json ./
COPY ./src/drizzle/ ./src/drizzle/
COPY ./drizzle.config.js ./


RUN npm install

COPY . .

RUN npx tsc -b

EXPOSE 8080

CMD ["npm", "run","start"]