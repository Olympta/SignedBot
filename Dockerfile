FROM node:latest

RUN mkdir -p /usr/bots/SignedBot
WORKDIR /usr/bots/SignedBot

COPY package.json /usr/bots/SignedBot
RUN npm install

COPY . /usr/bots/SignedBot

CMD ["npm", "run", "start"]