const systeminformation = require("systeminformation");

module.exports = {
    name: 'stats',
    aliases: ['statistics'],
    description: 'Gets this bot\'s statistics.',
    requiredPerm: "",
    disabled: false,
    launch(msg, bot) {
        try {
            let totalSeconds = (bot.uptime / 1000);
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
                let users = 0;
                bot.guilds.forEach((guild) => {
                    users += guild.memberCount;
                });
                msg.channel.createMessage({
                    embed: {
                        title: "SignedBot Stats",
                        author: {
                            name: "SignedBot",
                            icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                        },
                        fields: [
                            {
                                name: "Uptime",
                                value: uptime
                            },
                            {
                                name: "Amount of Members Serving",
                                value: users
                            },
                            {
                                name: "Amount of Guilds Serving",
                                value: bot.guilds.size
                            },
                            {
                                name: "Node Version",
                                value: process.version
                            },
                            {
                                name: "CPU", 
                                value: cpu.manufacturer + " " + cpu.brand
                            }, 
                            {
                                name: "Cores", 
                                value: cpu.cores
                            }
                        ],
                        color: 0x00b300,
                        footer: {
                            text: `SignedBot v${bot.foundation.config.version} | Created by Monotrix and iCraze`,
                            icon_url: "https://monotrix.xyz/assets/images/logo.png"
                        }
                    }
                });
            });
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}