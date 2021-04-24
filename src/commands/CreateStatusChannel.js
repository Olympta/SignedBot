const db = require("quick.db");
const fetch = require("node-fetch");

module.exports = {
    name: 'createstatuschannel',
    aliases: ['css'],
    description: 'Create a status channel that displays Jailbreaks.app\'s status.',
    requiredPerm: "manageChannels",
    disabled: true,
    async launch(msg, bot) {
        try {
            await bot.sendChannelTyping(msg.channel.id);
            if (!msg.member.guild.members.get(bot.user.id).permissions.has("manageChannels")) {
                return msg.channel.createMessage("I dont have the `manageChannels` permission, so I can't create the channel.");
            }
            let shouldExit = false;
            let listofids = db.get("statuschannels.ids");
            listofids.forEach(function (obj) {
                if (obj[0] == "Bruh") return;
                if (bot.guilds.get(obj[0]).channels.get(obj[1]) != undefined) shouldExit = true;
            });
            if (shouldExit) {
                return msg.channel.createMessage("You've already created a status channel in this guild.");
            }
            await msg.member.guild.createChannel(await fetch("https://jailbreaks.app/status.php").then(res => res.json()).then(body => body.status), 2).then(c => {
                c.editPermission(msg.member.guild.id, 1, "1048576");
                db.push("statuschannels.ids", [msg.member.guild.id, c.id]);
            });
            await msg.channel.createMessage("Created channel!");
            return;
        } catch (e) {
            console.log(e);
        }
    }
}