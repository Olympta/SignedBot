module.exports = {
    name: 'test',
    aliases: ['gg'],
    description: 'Test command.',
    requiredPerm: "DEV",
    disabled: false,
    launch(msg, bot) {
        msg.channel.createMessage({
            embed: {
                title: "Test Command!",
                author: {
                    name: "SignedBot",
                    icon_url: "https://jailbreaks.app/img/Jailbreaks.png"
                },
                fields: [
                    {
                        name: "Test",
                        value: "Joe Mama"
                    }
                ],
                color: 0x008000,
                footer: {
                    text: `SignedBot v${bot.foundation.config.version} | Created by Monotrix and iCraze`,
                    icon_url: "https://monotrix.xyz/assets/images/logo.png"
                }
            }
        })
    }
}