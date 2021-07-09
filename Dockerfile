FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN rm package-lock.json
RUN npm i
COPY . .
ARG APP_PORT=8030

CMD [ "node", "App.js" ]
