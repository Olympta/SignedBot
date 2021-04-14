const db = require("quick.db");

module.exports = {
    name: 'prefix',
    aliases: [],
    description: 'Set this guild\'s SignedBot prefix.',
    requiredPerm: "administrator",
    disabled: false,
    async launch(msg, bot) {
        try {
            let msgFiltered = msg.content.toLowerCase().replace(db.get(`prefix-${msg.member.guild.id}`), "").replace("<@" + bot.user.id + "> ", "").replace("<@" + bot.user.id + ">" , "").replace("<@!" + bot.user.id + "> ", "").replace("<@!" + bot.user.id + ">" , "");
            let newPrefix = msgFiltered.replace("prefix", "").replace(" ", "");
            if (!newPrefix) return message.inlineReply(`You need to specify what the new prefix should be.\nCurrent prefix: \`\`${db.get(`prefix-${msg.member.guild.id}`)}\`\``);
            db.set(`prefix-${msg.member.guild.id}`, newPrefix);
            msg.channel.createMessage(`This guild's prefix has been changed to: \`\`${newPrefix}\`\``);
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}