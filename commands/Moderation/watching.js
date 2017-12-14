const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'play',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Another one of Tylers little play toys. What does this one do?',
            usage: '<content:str>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [content]) {
        this.client.user.setActivity(`${content}`, { type: 1 })
        .catch(err => this.client.emit('log', err, 'error'));
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};