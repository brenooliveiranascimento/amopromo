FROM node:16.14-alpine

WORKDIR /amopromo-frontend

EXPOSE 3001

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "start" ]