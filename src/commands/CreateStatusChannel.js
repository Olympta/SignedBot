const db = require("quick.db");
const fetch = require("node-fetch");

module.exports = {
    name: 'createstatuschannel',
    aliases: ['css'],
    description: 'Create a status channel that displays Jailbreaks.app\'s status.',
    requiredPerm: "manageChannels",
    disabled: false,
    async launch(msg, bot) {
        try {
            await bot.sendChannelTyping(msg.channel.id);
            if (!msg.member.guild.members.get(bot.user.id).permissions.has("manageChannels")) {
                return msg.channel.createMessage("I dont have the `manageChannels` permission, so I can't create the channel.");
            }
            let shouldExit = false;
            let channels = db.get("statuschannels.ids");
            listofids = Array.from(channels.toString().split(" "));
            listofids.toString().split(",").forEach(function (id) {
                if (msg.member.guild.channels.get(id) != undefined) shouldExit = true;
            });
            if (shouldExit) {
                return msg.channel.createMessage("You've already created a status channel in this guild.");
            }
            await msg.member.guild.createChannel(await fetch("https://jailbreaks.app/status.php").then(res => res.json()).then(body => body.status), 2).then(c => {
                c.editPermission(msg.member.guild.id, 0, "1048576");
                db.push("statuschannels.ids", c.id);
            });
            await msg.channel.createMessage("Created channel!");
            return;
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}