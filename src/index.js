/*
 * SignedBot
 * Created by Monotrix and iCraze
*/

const { Discord, fetch, config, db, fs, path, exec, client, commands, moment } = require("./util/Foundation")

if (!config.token) return console.error(`[${config.logname}] You did not provide a token to log in with!`)
if (!config.logchannel) return console.error(`[${config.logname}] You did not provide a guild and channel to log to!`)

client.once("ready", () => {
    client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("Bot is online at " + new Date().toUTCString() + ". (EST: " + new Date().toLocaleTimeString() + ")\nServing " + client.guilds.cache.size + " servers.")
    console.log(`[${config.logname}] Logging in as ${client.user.tag} at ${new Date().toLocaleTimeString()}\n[${config.logname}] Prefix: ${config.globalPrefix}`);
    console.log(`[${config.logname}] Serving ${client.guilds.cache.size} servers.`);
    fetch("https://jailbreaks.app/status.txt").then(res => res.text()).then(body => { 
        if (body == "✅ Signed! https://jailbreaks.app\n") client.user.setActivity(config.globalPrefix + `help | Signed`, { type: "WATCHING" });
        else client.user.setActivity("sb!help | Revoked", { type: "WATCHING" });
    });
    setInterval(function() {
        exec("cd ../; git add .; git commit -m \"Update Database\"; git pull; git push; cd ./src;", function(err, data) {});
        fetch("https://jailbreaks.app/status.php").then(res => res.json()).then(body => {
            if (body.status == "Signed") client.user.setActivity(config.globalPrefix + `help | Signed`, { type: "WATCHING" });
            else client.user.setActivity(`${config.globalPrefix}help | Revoked`, { type: "WATCHING" });
            client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("Update: Bot status changed at " + new Date().toUTCString() + ". (EST: " + new Date().toLocaleTimeString() + ")\nServing " + client.guilds.cache.size + " servers.");

            let dmlist = db.get("dmlist.ids");
            let listofids = Array.from(dmlist.toString().split(" "));
            listofids.toString().split(",").forEach(function (id) {
                if (id != "Bruh") {
                    var filePath = path.join(__dirname, 'status/status.txt');
                    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
                        if (!err) {
                            if (data == body) { return; } else {
                                var newValue;
                                if (body.status == "Signed") { newValue = data.replace("Revoked", "Signed"); }
                                else { newValue = data.replace("Signed", "Revoked") }
                                fs.writeFile(filePath, newValue, {encoding: "utf-8"}, function(err, data) {});
                            }
                            msgToSend = "";
                            if (body.status == "Signed") msgToSend = "Jailbreaks.app is now signed!\nhttps://jailbreaks.app";
                            else msgToSend = "Jailbreaks.app has been revoked. :(";
                            client.users.cache.find(user => user.id === id).send(msgToSend);
                        } else {
                            console.log(err);
                        }
                    });
                }
            });
        })
    }, 300000);
});

client.on("message", (message, guild) => {
    if (message.author.bot) return;
    if (!db.get(`prefix-${message.guild.id}`)) db.set(`prefix-${message.guild.id}`, config.globalPrefix);
    if (message.content.startsWith(db.get(`prefix-${message.guild.id}`)) || message.content.startsWith("<@" + client.user.id + ">") || message.content.startsWith("<@!" + client.user.id + ">")) {
        let msgFiltered = message.content.replace(db.get(`prefix-${message.guild.id}`), "").replace("<@" + client.user.id + "> ", "").replace("<@" + client.user.id + ">" , "").replace("<@!" + client.user.id + "> ", "").replace("<@!" + client.user.id + ">" , "");
        let mentionFiltered = message.content.replace("<@" + client.user.id + "> ", "").replace("<@" + client.user.id + ">" , "").replace("<@!" + client.user.id + "> ", "").replace("<@!" + client.user.id + ">" , "");
        switch (msgFiltered.split(" ")[0]) {
            case "prefix":
                commands.get("prefix").execute(client, message, config, msgFiltered);
                break;
            case "suggest":
                commands.get("suggest").execute(client, message, config, msgFiltered);
                break;
            case "reportbug":
                commands.get("reportbug").execute(client, message, config, msgFiltered);
                break;
            case "optin":
                commands.get("optin").execute(client, message, config);
                break;
            case "optout":
                commands.get("optout").execute(client, message, config);
                break;
            case "serverlist":
                commands.get("serverlist").execute(client, message, config);
                break;
            case "stats":
                commands.get("stats").execute(client, message, config);
                break;
            case "help":
                commands.get("help").execute(client, message, config);
                break;
            case "status":
                commands.get("status").execute(client, message, config);
                break;
            case "inv":
                commands.get("invite").execute(client, message, config);
                break;
            case "invite":
                commands.get("invite").execute(client, message, config);
                break;
            case "support":
                commands.get("support").execute(client, message, config);
                break;
            case "changelog":
                commands.get("changelog").execute(client, message, config);
                break;
            case "reboot":
                commands.get("reboot").execute(client, message, config);
                break;
        }
        switch (mentionFiltered.split(" ")[0]) {
            case "":
                message.inlineReply(`Hi! I'm SignedBot.\nMy prefix on this guild is \`\`${db.get(`prefix-${message.guild.id}`)}\`\`\nYou can also ask me for help by mentioning me, like this: \`\`@SignedBot help\`\``)
                break;
            case " ":
                message.inlineReply(`Hi! I'm SignedBot.\nMy prefix on this guild is \`\`${db.get(`prefix-${message.guild.id}`)}\`\`\nYou can also ask me for help by mentioning me, like this: \`\`@SignedBot help\`\``)
                break;
        }
    } else {
        return;
    }
});

client.login(config.token);
