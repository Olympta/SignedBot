const systeminformation = require("systeminformation");
const os = require("os");

module.exports = {
    name: 'stats',
    aliases: ['statistics'],
    description: 'Gets this bot\'s statistics.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            await bot.sendChannelTyping(msg.channel.id);
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
                                name: "Amount of Members Shard is Serving",
                                value: users
                            },
                            {
                                name: "Amount of Guilds Shard is Serving",
                                value: bot.guilds.size
                            },
                            {
                                name: "Node Version",
                                value: process.version
                            },
                            {
                                name: "OS Type",
                                value: os.type()
                            },
                            {
                                name: "Host Arch",
                                value: os.arch()
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
        }
    }
}