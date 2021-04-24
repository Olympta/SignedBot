const hastebin = require("hastebin-gen");

module.exports = {
    name: 'serverlist',
    aliases: [],
    description: 'List of servers this bot is in.',
    requiredPerm: "DEV",
    disabled: false,
    async launch(msg, bot) {
        try {
            await bot.sendChannelTyping(msg.channel.id);
            let serverList = "";
            bot.guilds.forEach((guild) => {
                if (!guild.ownerID) return;
                if (!bot.users.get(guild.ownerID)) return;
                serverList += `NAME: ${guild.name} | ID: ${guild.id} | MEMBERS: ${guild.memberCount} | OWNER: ${bot.users.get(guild.ownerID).username}#${bot.users.get(guild.ownerID).discriminator}\n`
            });
            hastebin(serverList, {extention: "txt", url: "https://paste.mod.gg"}).then(haste => {
                msg.channel.createMessage(haste);
            })
        } catch (e) {
            console.log(e);
        }
    }
}