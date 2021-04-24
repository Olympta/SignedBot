const db = require("quick.db");

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Displays this help message.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            let cmds = [];
            bot.foundation.commands.forEach(command => {
                let valueMsg;
                if (command.disabled) {
                    if (command.disabled == true) return;
                }
                if (command.requiredPerm) {
                    if (command.requiredPerm != "") {
                        valueMsg = `${command.description}\nRequired Permission: ${command.requiredPerm}`
                    } else {
                        valueMsg = `${command.description}`
                    }
                } else {
                    valueMsg = `${command.description}`
                }
                cmds.push({name: `${db.get(`prefix-${msg.member.guild.id}`)}${command.name}`, value: valueMsg})
            });
            msg.channel.createMessage({
                embed: {
                    title: `SignedBot Commands`,
                    author: {
                        name: "SignedBot",
                        icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                    },
                    fields: cmds,
                    color: 0x00b300,
                    footer: {
                        text: `SignedBot v${bot.foundation.config.version} | Created by Monotrix and iCraze`,
                        icon_url: "https://monotrix.xyz/assets/images/logo.png"
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
}