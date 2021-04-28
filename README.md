#### SignedBot
A simple bot that grabs the status of Jailbreaks.app and presents it.<br>
#### Links
[Invite Link](https://discord.com/api/oauth2/authorize?client_id=812791708446097488&permissions=83968&scope=bot), [Support Discord](https://discord.gg/xdUkRxuvGQ), [Jailbreaks.app Discord](https://discord.gg/YG4CVPg)

#### Developers
- [Monotrix](https://github.com/Monotrix)
- [iCraze](https://twitter.com/iCrazeiOS)

---
**How to Use**<br>
**Approach One: Add bot to server (Recommended)**<br>
Follow [this link](https://discord.com/api/oauth2/authorize?client_id=812791708446097488&permissions=2048&scope=bot).<br>
**Approach Two: Set up bot for personal use (Advanced)**<br>
- Create a Discord application and convert it to a bot
- Copy config-example.json to config.json in src/data/
- Copy the token from the Discord developer panel
- Paste it into config.json in src/data
- Edit all info that is necessary (token, devs, version, changelog, globalPrefix)
- Run `npm install -g yarn --force`
- Run `yarn install` in the project root
- Run `yarn dev`, make sure no errors are thrown
- If everything works as expected, run `yarn start`