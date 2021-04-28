module.exports = {
    name: 'support',
    aliases: [],
    description: 'Gets this bot\'s support server invite.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            if (!bot.foundation.config.supportInvite) return;
            msg.channel.createMessage({
                    embed: {
                        title: `SignedBot Support Server Invite`,
                        author: {
                            name: "SignedBot",
                            icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                        },
                        color: 0x00b300,
                        url: `${bot.foundation.config.supportInvite}`,
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