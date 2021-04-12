const Discord = require("discord.js");

module.exports = {
    name: "reportbug",
    description: "Report Bug Command",
    execute(client, message, config, msgFiltered) {
        return;
        try {
            if (!config.reportchannel)
            if (msgFiltered.replace("reportbug", "") == "") return message.inlineReply("You did not provide a bug to report!");
            let embed = new Discord.MessageEmbed()
                .setAuthor("SignedBot", "https://jailbreaks.app/img/Jailbreaks.png")
                .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
                .addFields({name: "Bug", value: "```" + msgFiltered.replace("reportbug ", "") + "```"}, {name: "Reported By", value: message.author.username + "#" + message.author.discriminator}, {name: "Sent From", value: message.guild.name + " (" + message.guild.id + ")"})
                .setColor("#00b300")
            client.guilds.cache.get(config.reportchannel[0]).channels.cache.get(config.reportchannel[1]).send(embed);
            message.inlineReply("Sent!");
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
