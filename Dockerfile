# Set up Node
FROM node:15.14.0-alpine3.13

# Create Bot Directory
RUN mkdir -p /SignedBot

# Copy Files
COPY . /SignedBot

# Run Prep Commands
RUN cd /SignedBot && apk add --no-cache --virtual .gyp python3 make g++ && npm install -g yarn --force && yarn install

# Run Bot
CMD cd /SignedBot && yarn start