FROM node

RUN mkdir -p /app/glovaro.mail


WORKDIR /app/glovaro.mail

COPY package*.json /app/glovaro.mail

WORKDIR /app/glovaro.mail

RUN npm install

COPY . /app/glovaro.mail/

CMD [ "npm", "start" ]
