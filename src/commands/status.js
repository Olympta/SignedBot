const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "status",
    description: "Status Command",
    execute(client, message, config) {
        try {
            fetch("https://jailbreaks.app/status.php").then(res => res.json()).then(body => { 
                console.log(body.status)
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Jailbreaks.app Status", "https://jailbreaks.app/img/Jailbreaks.png")
                    .setURL("https://jailbreaks.app")
                    .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
                if (body.status == "Signed") {
                    embed.addFields({name: "Status", value: "Signed!"}).setColor("#00b300");
                    message.inlineReply(embed);
                } else if (body.status == "Revoked") {
                    embed.addFields({name: "Status", value: "Revoked"}).setColor("#b30000");
                    message.inlineReply(embed);
                } else if (!body) {
                    embed.addFields({name: "Status", value: "Could not get status..."}).setColor("#b30000");
                    message.inlineReply(embed);
                }
            });
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
