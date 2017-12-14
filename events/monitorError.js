const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            enabled: true
        });
    }

    async run(msg, monit, err) { 
        console.log(`${monit}\n${err}`)
        
    }

    async init() {

    }

};
