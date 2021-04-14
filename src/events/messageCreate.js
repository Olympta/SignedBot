const { Message } = require("eris");
const db = require("quick.db");

module.exports = async (client, msg) => {
    if (msg.channel.type != 0) return;
    if (!msg.member.guild) return;
    if (!db.get(`prefix-${msg.member.guild.id}`)) db.set(`prefix-${msg.member.guild.id}`, client.foundation.config.globalPrefix);
    if (!msg.content.includes(db.get(`prefix-${msg.member.guild.id}`))) return;
    let msgFiltered = msg.content.toLowerCase().replace(db.get(`prefix-${msg.member.guild.id}`), "").replace("<@" + client.user.id + "> ", "").replace("<@" + client.user.id + ">" , "").replace("<@!" + client.user.id + "> ", "").replace("<@!" + client.user.id + ">" , "");
    let cmd = client.foundation.commands.get(msgFiltered.split(" ")[0])
    if (!cmd) {
        client.foundation.commands.forEach(command => {
            if (command.aliases) {
                if (command.aliases.includes(msgFiltered.split(" ")[0])) {
                    cmd = client.foundation.commands.get(command.name)
                }
            }
        })
    }
    if (!cmd) return;
    if (cmd.disabled) {
        if (cmd.disabled == true) {
            return msg.channel.createMessage("That command is currently disabled.");
        }
    }
    if (cmd.requiredPerm) {
        if (cmd.requiredPerm != "") {
            if (cmd.requiredPerm == "DEV") {
                if (client.foundation.config.devs.includes(msg.author.id)) {
                    await cmd.launch(msg, client);
                    return;
                } else {
                    return msg.channel.createMessage("You must have the `" + cmd.requiredPerm + "` permission to execute this command.");
                }
            } else {
                let req = cmd.requiredPerm;
                let perms = msg.member.permissions.json;
                if (msg.member.permissions.has(req)) return await cmd.launch(msg, client);
                return msg.channel.createMessage("You must have the `" + cmd.requiredPerm + "` permission to execute this command.");
            }
        }
    }
    await cmd.launch(msg, client);
}