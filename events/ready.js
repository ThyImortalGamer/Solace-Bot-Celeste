const { Event } = require('klasa');

module.exports = class extends Event {

    async run() {
        return this.client.user.setActivity('!help', { type: 2 })
            .catch(err => this.client.emit('log', err, 'error'));

            const chanSuggestions = this.client.guilds.get('383660119218585600').channels.get('383716451489415178')
            
                        await chanSuggestions.messages.fetch({limit: 100}) //fetch the messages from the suggestions channel
                        messages = chanSuggestions.messages.array()
                        messages.forEach(element => { //react to each one
                            element.react('👍')
                        });
    }

};
