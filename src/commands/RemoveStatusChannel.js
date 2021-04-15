const db = require("quick.db");

module.exports = {
    name: 'removestatuschannel',
    description: 'Remove the status channel that displays Jailbreaks.app\'s status.',
    requiredPerm: "manageChannels",
    disabled: true,
    async launch(msg, bot) {
        try {
            await bot.sendChannelTyping(msg.channel.id);
            if (!msg.member.guild.members.get(bot.user.id).permissions.has("manageChannels")) {
                return msg.channel.createMessage("I dont have the `manageChannels` permission, so I can't remove the channel.");
            }
            var success = false;
            async function execute() {
                let channels = db.get("statuschannels.ids");
                listofids = Array.from(channels.toString().split(" "));
                await listofids.toString().split(",").forEach(async function (id) {
                    if (msg.member.guild.channels.get(id) != undefined) {
                        await msg.member.guild.channels.get(id).delete();
                        await db.set("statuschannels.ids", channels.filter(e => e !== id));
                        success = true;
                        return;
                    }
                });
                return;
            }
            console.log(success)
            await execute();
            console.log(success + "(after)")
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}