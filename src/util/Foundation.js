const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../data/config.json");
const db = require("quick.db");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
require("./InlineReplies");
const client = new Discord.Client();

let commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
}

module.exports = {
    Discord: Discord,
    fetch: fetch,
    config: config,
    db: db,
    fs: fs,
    path: path,
    exec: exec,
    client: client,
    commands: commands
}