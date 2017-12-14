const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: false,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false // 0.4.0-dev only
        });
    }

    run(msg) {
        var text;
        if(msg.author.id != '203709726322720768') return;
        switch(msg.content.toLowerCase()) {
            case 'hello':
            text = 'Hi'
            break
            case 'how are you?':
            text = 'I am good thank you!'
            break
            case 'what are you doing?':
            text = 'Looking for curlies.'
            break
            default:
            text = 'i didn\'t recognize that.'
        }
        msg.send(text)
    }
    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
