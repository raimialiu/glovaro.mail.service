FROM alpine:latest

RUN apk update
RUN apk add nodejs
RUN apk add npm

RUN mkdir -p /app/glovaro.mail

COPY package*.json /app/glovaro.mail


WORKDIR /app/glovaro.mail

RUN npm install

COPY . /app/glovaro.mail/

EXPOSE 3200

ENTRYPOINT npm start
