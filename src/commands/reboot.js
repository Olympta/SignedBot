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
        }
    }
}