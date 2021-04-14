const Eris = require("eris");
const Base = require('eris-sharder').Base;
const config = require("../data/config.json");
const bot = new Eris.Client(config.token, options = {
    restMode: true
});
const fs = require("fs");

let commands = new Eris.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
console.log(`[${config.logname}] Loading ${commandFiles.length} commands.`);
for (const file of commandFiles) {
    try {
        console.log(`[${config.logname}] Attempting to load \`command\` by the name of \`${file}\``);
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);
    } catch (e) {
        console.log(`[${config.logname}] Error loading load \`command\` by the name of \`${file}\`:\n${e}`);
    }
}

const events = fs.readdirSync("./events/").filter(file => file.endsWith(".js"));
console.log(`[${config.logname}] Loading ${events.length} events.`);
for (const ev of events) {
    try {
        console.log(`[${config.logname}] Attempting to load \`event\` by the name of \`${ev}\``);
        const event = require(`../events/${ev}`);
        bot.on(ev.split('.')[0], event.bind(null, bot));
    } catch (e) {
        console.log(`[${config.logname}] Error loading load \`event\` by the name of \`${ev}\`:\n${e}`);
    }
}

module.exports = {
    Eris: Eris,
    Base: Base,
    config: config,
    bot: bot,
    commands: commands,
    events: events
}

bot.foundation = module.exports;