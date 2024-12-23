FROM node:20

WORKDIR /frontend

COPY package*.json ./
RUN npm install
RUN npm install sharp

COPY . .

ARG NEXT_PUBLIC_SERVER_SOCKET_URl
ARG NEXT_PUBLIC_SERVER_URl


RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]