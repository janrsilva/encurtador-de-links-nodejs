# @janrsilva | see https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/

FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g nodemon
RUN npm i

CMD [ "node", "dist/server.js" ]
