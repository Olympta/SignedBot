module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Ping command.',
    requiredPerm: "",
    disabled: false,
    launch(msg, bot) {
        msg.channel.createMessage("Pinging...").then(async (m) => {
            await m.edit(`Pong! Ping is ${new Date() - m.timestamp} ms.`);
        });
    }
}