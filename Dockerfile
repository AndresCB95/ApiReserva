FROM node:latest

COPY . .

RUN npm install

EXPOSE 8084

ENTRYPOINT [ "node", "index.js" ]