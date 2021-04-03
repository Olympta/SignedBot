const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invite Command",
    execute(client, message, config) {
        try {
            if (!config.botInvite) return;
            let embed = new Discord.MessageEmbed()
                .setAuthor("SignedBot Invite Link", "https://jailbreaks.app/img/Jailbreaks.png")
                .setURL(config.botInvite)
                .setTitle("Invite Me")
                .setColor("#00b300")
                .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
            message.inlineReply(embed);
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
