const Foundation = require("./util/Foundation");

Foundation.bot.connect()

// Logout Logs
process.stdin.resume();

process.on('SIGINT', async function () {
    await console.log(`\n[${Foundation.config.logname}] Logging out of \"${Foundation.bot.user.username}#${Foundation.bot.user.discriminator}\" at ${new Date().toUTCString()}. (EST: ${new Date().toLocaleTimeString()})`);
    await Foundation.bot.guilds.get(Foundation.config.logchannel[0]).channels.get(Foundation.config.logchannel[1]).createMessage(`Bot is going down at ${new Date().toUTCString()}. (EST: ${new Date().toLocaleTimeString()})`)
    process.exit()
});