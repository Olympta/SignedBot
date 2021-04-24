module.exports = {
    name: 'changelog',
    aliases: [],
    description: 'Changelog for the current version of this bot.',
    requiredPerm: "",
    disabled: false,
    async launch(msg, bot) {
        try {
            msg.channel.createMessage({
                    embed: {
                        title: `SignedBot Changelog for v${bot.foundation.config.version}`,
                        author: {
                            name: "SignedBot",
                            icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                        },
                        fields: [
                            {
                                name: "Changelog",
                                value: bot.foundation.config.changelog
                            }
                        ],
                        color: 0x00b300,
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