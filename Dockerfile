FROM alpine:latest

RUN apk update
RUN apk add nodejs nodejs-npm

RUN mkdir -p /app/glovaro.mail

COPY package*.json /app/glovaro.mail


WORKDIR /app/glovaro.mail

RUN npm -s install

COPY . /app/glovaro.mail/

EXPOSE 3200

ENTRYPOINT npm start
