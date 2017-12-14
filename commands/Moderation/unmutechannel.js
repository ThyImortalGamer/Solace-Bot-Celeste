const { Command } = require('klasa');

const staffrole = '383664307243712515'
const general = '383660119218585602'
const bot = '383759035330985984'
const everyone = '383660119218585600'
const fullmember = '383768374485712896'

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
            description: 'For staff to unmute a channel with.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'Use this to unmute a channel. If errors are given, please do the correct permissions yourself.'
        });
    }

    async run(msg) {

        if(msg.channel.id == general || msg.channel.id == bot) {
            msg.channel.overwritePermissions(`${everyone}`, { 'SEND_MESSAGES': null, 'ADD_REACTIONS': null  })
            .catch(error => { console.log(error); msg.send('There seems to have been an error giving everyone permissions to the channel.')});
        }
        msg.channel.overwritePermissions(`${fullmember}`, { 'SEND_MESSAGES': true, 'ADD_REACTIONS': null  })
        .catch(error => { console.log(error); msg.send('There seems to have been an error giving the nobles permissions to the channel.')});
        msg.send('Channel has now been unmuted.')
    }

    async init() {

    }

};
