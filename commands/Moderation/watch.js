const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'watch',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Tylers little play toy. Used for watching users... I wonder what it does?',
            usage: '<user:mention>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [user]) {
        this.client.user.setActivity(`${user.username}`, { type: 3 })
        .then(msg.send('Stalk mode, activated...'))
        .catch(err => this.client.emit('log', err, 'error'));
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};