const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            enabled: true
        });
    }

    run(oldMember, newMember) {
        if(newMember.voiceChannel.parentID == '383660119218585603') {
            newMember.addRole('389619246520598548')
        }
        else if(!newMember.voiceChannel) {
            console.log('User left.')
            newMember.removeRole('389619246520598548')
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
