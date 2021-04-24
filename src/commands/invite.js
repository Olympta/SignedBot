module.exports = {
    name: 'invite',
    aliases: ['inv'],
    description: 'Get this bot\'s invite.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            msg.channel.createMessage({
                    embed: {
                        title: `SignedBot Invite`,
                        author: {
                            name: "SignedBot",
                            icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                        },
                        color: 0x00b300,
                        url: `${bot.foundation.config.botInvite}`,
                        footer: {
                            text: `SignedBot v${bot.foundation.config.version} | Created by Monotrix and iCraze`,
                            icon_url: "https://monotrix.xyz/assets/images/logo.png"
                        }
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }
}