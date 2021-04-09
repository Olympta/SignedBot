const Discord = require("discord.js");

module.exports = {
    name: "reboot",
    description: "Reboot Command",
    execute(client, message, config) {
        try {
            if (!config.devs.includes(message.author.id)) return;
            message.channel.send("Rebooting...")
            process.exit()
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
