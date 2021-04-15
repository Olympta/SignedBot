const hastebin = require("hastebin-gen");

module.exports = {
    name: 'serverlist',
    aliases: [],
    description: 'List amount of servers this bot is in.',
    requiredPerm: "DEV",
    disabled: false,
    async launch(msg, bot) {
        try {
            let serverList = "";
            bot.guilds.forEach((guild) => {
                if (!guild.ownerID) return;
                serverList += `NAME: ${guild.name} | ID: ${guild.id} | MEMBERS: ${guild.memberCount} | OWNER: ${guild.members.get(guild.ownerID).user.tag}\n`
            });
            hastebin(serverList, {extention: "txt", url: "https://paste.mod.gg"}).then(haste => {
                msg.channel.createMessage(haste);
            })
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}