const db = require("quick.db");

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Displays this help message.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            msg.channel.createMessage({
                    embed: {
                        title: `SignedBot Commands`,
                        author: {
                            name: "SignedBot",
                            icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                        },
                        fields: [
                            {name: `**${db.get(`prefix-${msg.member.guild.id}`)}status**`, value: "Gets sign status of Jailbreaks.app."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}prefix**`, value: "Change this guilds' prefix for SignedBot."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}invite**`, value: "Sends the bot\'s invite link."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}stats**`, value: "Gets this bot\'s statistics."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}optin**`, value: "Opts you in to get DMed when Jailbreaks.app is signed / unsigned."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}optout**`, value: "Opts you out to get DMed when Jailbreaks.app is signed/unsigned."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}changelog**`, value: "Gets the changelog for this version of SignedBot."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}support**`, value: "Gets the invite for this bot's support server."}, {name: `**${db.get(`prefix-${msg.member.guild.id}`)}createstatuschannel**`, value: "Creates a status channel that displays Jailbreaks.app\'s status."}
                        ],
                        color: 0x00b300,
                        footer: {
                            text: `SignedBot v${bot.foundation.config.version} | Created by Monotrix and iCraze`,
                            icon_url: "https://monotrix.xyz/assets/images/logo.png"
                        }
                    }
                });
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}