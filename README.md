# SignedBot
A simple bot that grabs the status of Jailbreaks.app and presents it.

## How to use
### Approach One: Add bot to server
Follow [this link](https://discord.com/api/oauth2/authorize?client_id=812791708446097488&permissions=2048&scope=bot).
### Approach Two: Set up bot for personal use (Advanced)
- Create a Discord application and convert it to a bot
- Copy config-example.json to config.json in src/data 
- Copy the token from the Discord developer panel
- Paste it into config.json in src/data
- Edit all info that is necessary (token, devs, logchannel (goes in "GUILD" then "CHANNEL" order))
- Run `npm install -g yarn --force`
- Run `yarn install` in the project root
- Run `yarn dev`, make sure no errors are thrown
- If everything works as expected, run `yarn start`
