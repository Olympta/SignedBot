const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "optin",
    description: "Opt In Command",
    execute(client, message, config, msgFiltered) {
        try {
            if (!db.get("dmlist.ids").includes(message.member.id)) {
                db.push("dmlist.ids", message.member.id);
                message.inlineReply("You will now be DM'd when apps are revoked/resigned.");
            } else message.inlineReply("You have already been added to the DM list.");
        } catch (e) {
            console.log(e)
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + module.exports.name + "``\n```" + e + "```")
        }
    }
}
