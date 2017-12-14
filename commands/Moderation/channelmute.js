const { Command } = require('klasa');
const staffrole = '383664307243712515'
let message;
let user;
let newtime;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'channelmute',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 5,
            botPerms: [],
            requiredSettings: [],
            description: 'For staff to mute a user in a channel, with optional time constraints.',
            usage: '<user:member> [time:num]',
            usageDelim: ' ',
            extendedHelp: `This is to mute a user in a channel, with an optional timeout in minutes. Do "!channelmute @user 15" to mute the user for fifteen minutes. If no time is given, then it will be until you do "!channelunmute @user"`
        });
    }

    async run(msg, [user, time]) {
        newtime = time * 1000 * 60 
        if (!time) {
            message = 'Muting user in this channel.'
        } else if(time == 1) {
            message = `Muting user in this channel, unmuting in ${time} minute.`
        } else {
            message = `Muting user in this channel, unmuting in ${time} minutes.`
        }
        msg.channel.overwritePermissions(user, { 'SEND_MESSAGES': false, 'ADD_REACTIONS': false  })
        .catch(err => msg.send('There seems to have been an error.'), console.log(err))
        await msg.send(`${message}`);
        setTimeout(() => {
          if (!time) return;
           msg.send(`${user} you have been unmuted in this channel.`);
           msg.channel.permissionOverwrites.get(user.id).delete();
        }, newtime);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
