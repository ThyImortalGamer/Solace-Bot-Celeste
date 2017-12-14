const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'raid',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 5,
            botPerms: [],
            requiredSettings: [],
            description: 'Please use this if you are quiet certain there is a raid going on/about to happen. Be careful though, as this will delete ALL invite links.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        msg.guild.fetchInvites().then(invites => {
            invites.deleteAll()
            }).catch(err => {
            msg.reply("There was an error, please contact a team leader and ask them to manually delete all invite links.")
            console.log(err)
            })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};