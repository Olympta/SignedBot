const chalk = require("chalk");
const Base = require('eris-sharder').Base;

module.exports = class extends Base {
    constructor(bot) {
        super(bot)
    }
    async launch() {
        const Eris = require("eris");
        const fs = require("fs");
        const chalk = require("chalk");
        const config = require("./data/config.json");
        let commands = new Eris.Collection();
        const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
        console.log(`${chalk.greenBright("==>")} Loading ${commandFiles.length} commands.`);
        for (const file of commandFiles) {
            try {
                console.log(`${chalk.greenBright("==>")} Attempting to load \`command\` by the name of \`${file}\``);
                const command = require(`./commands/${file}`);
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
                const event = require(`./events/${ev}`);
                this.bot.on(ev.split('.')[0], event.bind(null, this.bot));
            } catch (e) {
                console.log(`${chalk.redBright("==>")} Error loading load \`event\` by the name of \`${ev}\`:\n${e}`);
            }
        }

        module.exports = {
            Eris: Eris,
            config: config,
            bot: this.bot,
            commands: commands,
            events: events
        }

        this.bot.foundation = module.exports;
        this.bot.ipc = this.ipc;
        this.bot.clusterID = this.clusterID;
        this.bot.commands = commands;
        this.bot.events = events;
        require(`${__dirname}/events/ready`)(this.bot)
    }
}

// Logout Logs
process.stdin.resume();

process.on('SIGINT', async function () {
    await console.log(`\n${chalk.yellowBright("==>")} Logging out of \"${Foundation.bot.user.username}#${Foundation.bot.user.discriminator}\" at ${new Date().toUTCString()}. (EST: ${new Date().toLocaleTimeString()})`);
    process.exit();
});