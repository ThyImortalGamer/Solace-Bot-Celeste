const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 5,
            botPerms: [],
            requiredSettings: [],
            description: 'For staff to unmute a user in a channel.',
            usage: '<user:member>',
            usageDelim: undefined,
            extendedHelp: `To unmute a user in a channel. Just do "!channelunmute @user"`
        });
    }

    async run(msg, [user]) {
        msg.channel.permissionOverwrites.get(user.id).delete()
        .then(msg.send('User unmuted in this channel.'))
        .catch(err => msg.send('Hmm. There seems to be an error.'), console.log(err))
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
