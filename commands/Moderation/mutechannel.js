const { Command } = require('klasa');

const staffrole = '383664307243712515'
const general = '383660119218585602'
const bot = '383759035330985984'
const everyone = '383660119218585600'
const fullmember = '383768374485712896'

let newtime;
let message;

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
            description: 'For staff to mute a channel, with optional time unmuting.',
            usage: '[time:num]',
            usageDelim: undefined,
            extendedHelp: `Use this to mute a channel, and deny everyone permissions to send messages in that channel. You may add an optional timeout - e.g. "!mutechannel 15" would mute the channel, and unmute in fifteen minutes. Please send a message with your reason for muting the channel after. And if you do not give a timeout, please remember to come back and unmute the channel after you see fit.`
        });
    }

    async run(msg, [time]) {
        newtime = time * 1000 * 60 
        if (!time) {
            message = 'This channel has been muted. Please wait for a member of staff to unmute this channel.'
        } else if(time == 1) {
            message = `This channel has been muted. It will be unmuted in ${time} minute.`
        } else {
            message = `This channel has been muted. It will be unmuted in ${time} minutes.`
        }
        if(msg.channel.id == general || msg.channel.id == bot) {
            msg.channel.overwritePermissions(`${everyone}`, { 'SEND_MESSAGES': false, 'ADD_REACTIONS': false  })
            .catch(error => { console.log(error); msg.send('There seems to have been an error denying everyone permissions to the channel.')});
        }
        msg.channel.overwritePermissions(`${fullmember}`, { 'SEND_MESSAGES': false, 'ADD_REACTIONS': false  })
        .catch(error => { console.log(error); msg.send('There seems to have been an error denying the nobles permissions to the channel.')});
        await msg.send(`${message}`);
        setTimeout(() => {
          if (!time) return;
          if(msg.channel.id == general || msg.channel.id == bot) {
            msg.channel.overwritePermissions(`${everyone}`, { 'SEND_MESSAGES': null, 'ADD_REACTIONS': null  })
            .catch(error => { console.log(error); msg.send('There seems to have been an error giving everyone permissions to the channel.')});
        }
        msg.channel.overwritePermissions(`${fullmember}`, { 'SEND_MESSAGES': true, 'ADD_REACTIONS': null  })
        .catch(error => { console.log(error); msg.send('There seems to have been an error giving the nobles permissions to the channel.')});
        msg.send('Channel has now been unmuted.')
        }, newtime);
        
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
