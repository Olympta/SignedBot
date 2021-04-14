module.exports = {
    name: 'reboot',
    aliases: [],
    description: 'Reboot the bot.',
    requiredPerm: "DEV",
    disabled: false,
    async launch(msg, bot) {
        try {
            await msg.channel.createMessage("Rebooting...");
            process.exit();
        } catch (e) {
            console.log(e);
            bot.guilds.get(bot.foundation.config.logchannel[0]).channels.get(bot.foundation.config.logchannel[1]).createMessage("ERROR with ``" + module.exports.name + "``\n```" + e + "```");
        }
    }
}