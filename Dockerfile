FROM alpine:latest



EXPOSE 3200

RUN apk add --update nodejs npm

RUN mkdir -p /app/glovaro.mail


WORKDIR /app/glovaro.mail

COPY package*.json /app/glovaro.mail



RUN npm install

COPY . /app/glovaro.mail/

CMD [ "npm", "start" ]
