const db = require("quick.db");

module.exports = async (client, msg) => {
    if (msg.channel.type != 0) return;
    if (!msg.member) return;
    if (msg.member.bot) return;
    if (!db.get(`prefix-${msg.member.guild.id}`)) db.set(`prefix-${msg.member.guild.id}`, client.foundation.config.globalPrefix);
    if (msg.content.startsWith(db.get(`prefix-${msg.member.guild.id}`)) || msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) {} else { return; }
    let msgFiltered = msg.content.toLowerCase().replace(db.get(`prefix-${msg.member.guild.id}`), "").replace(`<@${client.user.id}> `, "").replace(`<@${client.user.id}>` , "").replace(`<@!${client.user.id}> `, "").replace(`<@!${client.user.id}>` , "");
    let mentionFiltered = msg.content.replace(`<@${client.user.id}> `, "").replace(`<@${client.user.id}>` , "").replace(`<@!${client.user.id}> `, "").replace(`<@!${client.user.id}>` , "");
    if (mentionFiltered == "") {
        return msg.channel.createMessage(`Hi! I'm SignedBot.\nMy prefix on this guild is \`\`${db.get(`prefix-${msg.member.guild.id}`)}\`\`\nYou can also ask me for help by mentioning me, like this: \`\`@${client.user.username} help\`\``)
    }
    let cmd = client.foundation.commands.get(msgFiltered.split(" ")[0])
    if (!cmd) {
        client.foundation.commands.forEach(command => {
            if (command.aliases) {
                if (command.aliases.includes(msgFiltered.split(" ")[0])) {
                    cmd = client.foundation.commands.get(command.name)
                }
            }
        });
    }
    if (!cmd) return;
    if (cmd.disabled) {
        if (cmd.disabled == true && !client.foundation.config.devs.includes(msg.author.id)) {
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
                let req = cmd.requiredPerm.toLowerCase();
                if (msg.member.permission.has(req)) return await cmd.launch(msg, client);
                return msg.channel.createMessage("You must have the `" + cmd.requiredPerm + "` permission to execute this command.");
            }
        }
    }
    await cmd.launch(msg, client);
}
