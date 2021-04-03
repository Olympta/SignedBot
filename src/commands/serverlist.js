const Discord = require("discord.js");
const hastebin = require("hastebin-gen");

module.exports = {
    name: "serverlist",
    description: "Server List Command",
    async execute(client, message, config) {
        try {
            if (!config.devs) return;
            if (!config.devs.includes(message.author.id)) return;
            let serverList = "";
            client.guilds.cache.forEach((guild) => {
                if (!guild.available) return;
                if (guild.owner == null) return;
                serverList += `NAME: ${guild.name} | ID: ${guild.id} | MEMBERS: ${guild.members.cache.filter(member => !member.user.bot).size} | BOTS: ${guild.members.cache.filter(member => member.user.bot).size} | OWNER: ${guild.owner.user.tag}\n`
            });
            hastebin(serverList, {extention: "txt", url: "https://paste.mod.gg"}).then(haste => {
                message.inlineReply(haste);
            }).catch(error => {
                message.inlineReply(error);
            });
        }  catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
