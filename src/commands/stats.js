const Discord = require("discord.js");
const systeminformation = require("systeminformation");

module.exports = {
    name: "stats",
    description: "Stats Command",
    execute(client, message, config) {
        try {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            let daysText = (days == 1 ? "day" : "days");
            let hoursText = (hours == 1 ? "hour" : "hours");
            let minutesText = (minutes == 1 ? "minute" : "minutes");
            let daysFinal = (days >= 1 ? days + " " + daysText + ", " : "");
            let hoursFinal = (hours >= 1 ? hours + " " + hoursText + ", " : "");
            let minutesFinal = (minutes >= 1 ? minutes + " " + minutesText + " and " : "");
            let uptime = `${daysFinal}${hoursFinal}${minutesFinal}${seconds} seconds`;
            systeminformation.cpu().then(cpu => {
                let embed = new Discord.MessageEmbed()
                    .setColor("#00b300")
                    .setURL("https://jailbreaks.app/")
                    .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
                    .addFields({name: "Uptime", value: uptime}, {name: "Amount of members serving", value: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}, {name: "Amount of servers", value: client.guilds.cache.size}, {name: "Node Version", value: process.version}, {name: "CPU", value: cpu.manufacturer + " " + cpu.brand}, {name: "Cores", value: cpu.cores}, {name: "Speed", value: cpu.speed})
                    .setAuthor("SignedBot Statistics", "https://jailbreaks.app/img/Jailbreaks.png")
                message.inlineReply(embed);
            });
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
