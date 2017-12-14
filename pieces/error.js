const { Piece } = require('klasa');


class Error {
    async send(input, channel) {
        return new Promise((Resolve, Reject) => {
            if (!input) Reject('You need to define the error');
            if (!channel) Reject('You need to define the channel');
            const embed = new this.client.methods.Embed() //create an embed
            .setTitle('ERROR')
            .setColor('#c60000')
            .setDescription(`An error occured`)
            .addField("The error:", input)
            .addField("The channel:", channel)
            .setTimestamp();
        this.client.channels.get('384057004592857092').send({ embed }); //send the embed to the Error Logs channel
        Resolve('Error sent.')
        });
    }

}

module.exports = Error; 