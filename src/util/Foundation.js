const Eris = require("eris");
const config = require("../data/config.json");
const bot = new Eris.Client(config.token, options = {
    restMode: true
});
const fs = require("fs");
const chalk = require("chalk");
let commands = new Eris.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
console.log(`${chalk.greenBright("==>")} Loading ${commandFiles.length} commands.`);
for (const file of commandFiles) {
    try {
        console.log(`${chalk.greenBright("==>")} Attempting to load \`command\` by the name of \`${file}\``);
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);
    } catch (e) {
        console.log(`${chalk.redBright("==>")} Error loading load \`command\` by the name of \`${file}\`:\n${e}`);
    }
}

const events = fs.readdirSync("./events/").filter(file => file.endsWith(".js"));
console.log(`${chalk.greenBright("==>")} Loading ${events.length} events.`);
for (const ev of events) {
    try {
        console.log(`${chalk.greenBright("==>")} Attempting to load \`event\` by the name of \`${ev}\``);
        const event = require(`../events/${ev}`);
        bot.on(ev.split('.')[0], event.bind(null, bot));
    } catch (e) {
        console.log(`${chalk.redBright("==>")} Error loading load \`event\` by the name of \`${ev}\`:\n${e}`);
    }
}

module.exports = {
    Eris: Eris,
    config: config,
    bot: bot,
    commands: commands,
    events: events
}

bot.foundation = module.exports;