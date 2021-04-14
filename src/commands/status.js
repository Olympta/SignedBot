const fetch = require("node-fetch");

module.exports = {
    name: 'status',
    aliases: [],
    description: 'Gets the status of Jailbreaks.app.',
    requiredPerm: "",
    disabled: false,
    launch(msg, bot) {
        try {
            fetch("https://jailbreaks.app/status.php").then(res => res.json()).then(body => {
                let content;
                let eColor;
                if (body.status == "Signed") {
                    content = "Signed!";
                    eColor = 0x00b300;
                } else if (body.status == "Revoked") {
                    content = "Revoked.";
                    eColor = 0xb30000;
                } else if (!body) {
                    content = "Could not get status...";
                    eColor = 0xb30000;
                }
                msg.channel.createMessage({
                    embed: {
                        title: "Jailbreaks.app Status",
                        author: {
                            name: "SignedBot",
                            icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                        },
                        fields: [
                            {
                                name: "Status",
                                value: content
                            }
                        ],
                        color: eColor,
                        footer: {
                            text: `SignedBot v${bot.foundation.config.version} | Created by Monotrix and iCraze`,
                            icon_url: "https://monotrix.xyz/assets/images/logo.png"
                        }
                    }
                });
            });
        } catch (e) {
            console.log(e)
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}