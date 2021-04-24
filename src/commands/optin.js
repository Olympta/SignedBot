const db = require("quick.db");

module.exports = {
    name: 'optin',
    aliases: [],
    description: 'Opt in for DMs from the bot when Jailbreaks.app gets signed and revoked.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            if (!db.get("dmlist.ids").toString().includes(msg.member.id)) {
                db.push("dmlist.ids", msg.member.id);
                msg.channel.createMessage("You will now be DM'd when apps are revoked/resigned.");
            } else msg.channel.createMessage("You have already been added to the DM list.");
        } catch (e) {
            console.log(e);
        }
    }
}