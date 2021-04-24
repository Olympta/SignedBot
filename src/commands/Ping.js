module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Ping command.',
    requiredPerm: "",
    disabled: true,
    launch(msg, bot) {
        msg.channel.createMessage("Pinging...").then(async (m) => {
            var start = new Date();
            await m.edit(`Pong! Ping is ${start - new Date()} ms.`);
        });
    }
}