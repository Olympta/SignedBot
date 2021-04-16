FROM node:latest

RUN mkdir -p /usr/bots/SignedBot
WORKDIR /usr/bots/SignedBot

COPY . /usr/bots/SignedBot
RUN npm install -g yarn --force
RUN yarn install

CMD ["yarn", "run", "start"]