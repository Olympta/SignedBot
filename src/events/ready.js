const fetch = require("node-fetch");
const db = require("quick.db");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const chalk = require('chalk');

module.exports = async (client) => {
    /*
    db.push("dmlist.ids", "Bruh");
    db.push("statuschannels.ids", ["Bruh", "Bruh"]);
    db.delete("statuschannels.ids");
    */
    /*setInterval(async function () {
        let listofids = db.get("statuschannels.ids");
        listofids.forEach(async function (obj) {
            if (obj[0] == "Bruh") return;
            if (!client.guilds.get(obj[0])) return;
            if (client.guilds.get(obj[0]).channels.get(obj[1]) == undefined) return db.set("statuschannels.ids", listofids.filter(e => e !== [obj[0], obj[1]]));
            let status;
            await fetch("https://api.monotrix.xyz/v1/jba/status").then(res => res.json()).then(body => { status = body.message; });
            client.guilds.get(obj[0]).channels.get(obj[1]).edit({
                name: status
            })
            client.guilds.get(obj[0]).channels.get(obj[1]).editPermission(obj[0], 1, "1048576");
        });
    }, 3000);*/
    console.log(`${chalk.greenBright("==>")} Logging in as \"${client.user.username}#${client.user.discriminator}\" at ${new Date().toLocaleTimeString()}`);
    console.log(`${chalk.greenBright("==>")} Global Prefix: ${client.foundation.config.globalPrefix}`);
    console.log(`${chalk.greenBright("==>")} Serving ${client.guilds.size} servers.`);
    fetch("https://api.monotrix.xyz/v1/jba/status").then(res => res.json()).then(body => {
        if (body.message == "Signed") {
            client.foundation.bot.editStatus(`online`, {
                name: `${client.foundation.config.globalPrefix}help | Signed`,
                type: 3
            });
        } else {
            client.foundation.bot.editStatus(`dnd`, {
                name: `${client.foundation.config.globalPrefix}help | Revoked`,
                type: 3
            });
        }
    });
    setInterval(function() {
        exec("git add ./status/status.txt; git commit -m \"Update Database\"; git pull; git push; cd ./src;", function(err, data) {});
        fetch("https://api.monotrix.xyz/v1/jba/status").then(res => res.json()).then(body => {
            if (body.message == "Signed") {
                client.foundation.bot.editStatus(`online`, {
                    name: `${client.foundation.config.globalPrefix}help | Signed`,
                    type: 3
                });
            } else {
                client.foundation.bot.editStatus(`dnd`, {
                    name: `${client.foundation.config.globalPrefix}help | Revoked`,
                    type: 3
                });
            }
            let dmlist = db.get("dmlist.ids");
            let listofids = Array.from(dmlist.toString().split(" "));
            listofids.toString().split(",").forEach(function (id) {
                if (id != "Bruh") {
                    var filePath = path.join(__dirname, '../status/status.txt');
                    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
                        if (!err) {
                            if (data == body.message) { return; } else {
                                var newValue;
                                if (body.message == "Signed") { newValue = data.replace("Revoked", "Signed"); }
                                else { newValue = data.replace("Signed", "Revoked") }
                                fs.writeFile(filePath, newValue, {encoding: "utf-8"}, function(err, data) {});
                            }
                            msgToSend = "";
                            if (body.message == "Signed") msgToSend = "Jailbreaks.app is now signed!\nhttps://jailbreaks.app";
                            else msgToSend = "Jailbreaks.app has been revoked. :(";
                            try {
                                client.getDMChannel(id).then(channel => {
                                    channel.createMessage(msgToSend);
                                });
                            } catch (e) {
                                return;
                            }
                        } else {
                            console.log(err);
                        }
                    });
                }
            });
            /*let channels = db.get("statuschannels.ids");
            listofids = Array.from(channels.toString().split(" "));
            listofids.toString().split(",").forEach(function (id) {
                if (id == "Bruh") return;
                client.guilds.forEach(guild => { 
                    if (client.guilds.get(guild.id).channels.get(id) == undefined) return db.set("statuschannels.ids", channels.filter(e => e !== id));
                    client.guilds.get(guild.id).channels.get(id).edit({
                        name: body.message
                    })
                    client.guilds.get(guild.id).channels.get(id).editPermission(guild.id, 1, "1048576");
                })
            });*/
        })
    }, 300000);
}