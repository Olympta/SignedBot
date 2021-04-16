FROM node:latest

RUN mkdir -p /usr/bots/SignedBot
WORKDIR /usr/bots/SignedBot

COPY package.json /usr/bots/SignedBot
COPY package-lock.json /usr/bots/SignedBot
COPY yarn.lock /usr/bots/SignedBot
RUN npm install -g yarn --force
RUN yarn install

COPY . /usr/bots/SignedBot

CMD ["yarn", "run", "start"]