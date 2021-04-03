# SignedBot
A simple bot that grabs the status of Jailbreaks.app and presents it.

## How to use
### Approach One: Add bot to server
Follow [this link](https://discord.com/api/oauth2/authorize?client_id=812791708446097488&permissions=2048&scope=bot).
### Approach Two: Set up bot for personal use (Advanced)
- Create a Discord application and convert it to a bot
- Copy the token
- Open config-example.json in src/data
- Edit all info that is necessary (token, devs, logchannel (goes in "GUILD" then "CHANNEL" order))
- Run `npm i` in the project root
- Run `npm run dev`, make sure no errors are thrown
- If everything works as expected, run `npm run start`