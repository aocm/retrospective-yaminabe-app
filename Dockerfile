FROM node:14-slim

WORKDIR /usr/src/app
RUN apt-get update
RUN npm install -g npm @vue/cli @ionic/cli
