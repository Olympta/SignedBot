const Discord = require("discord.js");

module.exports = {
    name: "support",
    description: "Support Command",
    execute(client, message, config) {
        try {
            if (!config.supportInvite) return;
            let embed = new Discord.MessageEmbed()
                .setAuthor("SignedBot Support Server Invite Link", "https://jailbreaks.app/img/Jailbreaks.png")
                .setColor("#00b300")
                .setURL("https://jailbreaks.app")
                .addFields({name: "Invite link", value: config.supportInvite})
                .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
            message.inlineReply(embed);
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
