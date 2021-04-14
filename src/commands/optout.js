const db = require("quick.db");

module.exports = {
    name: 'optout',
    aliases: [],
    description: 'Opt out from DMs from the bot when Jailbreaks.app gets signed and revoked.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            if (db.get("dmlist.ids").includes(msg.member.id)) {
                let arr = db.get("dmlist.ids");
                let filtered = arr.filter(e => e !== msg.member.id);
                db.set("dmlist.ids", filtered);
                msg.channel.createMessage("You will no longer be DM'd when apps are revoked/resigned.");
            } else msg.channel.createMessage("You are not on the DM list..");
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}