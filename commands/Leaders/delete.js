const { Command } = require('klasa');
let channelname

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 6,
            botPerms: [],
            requiredSettings: [],
            description: 'For leaders to delete a issue/archived channel.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'Use this on a issue/archived channel, and it will be deleted.'
        });
    }

    async run(msg) {
        
        if(msg.channel.parent.id != '383793027455516675' && msg.channel.parent.id != '383719583124553729') return msg.reply("You may only use this on an archive or issue channel.")

        if(msg.channel.parent.id == '383793027455516675') {
            channelname = 'archive'
        } else {
            channelname = 'issue'
        }

        const embed = new this.client.methods.Embed()
            .setTitle("CHANNEL DELETED")
            .setDescription(`An ${channelname} channel was deleted.`)
            .setColor("#edff2d")
            .addField("Deleted Channel Name:", msg.channel.name)
            .addField("Deleted by:", msg.member.displayName)
            .setTimestamp();

        this.client.channels.get('384057004592857092').send({embed})

        msg.reply("Preparing to delete channel")
        setTimeout(() => {msg.channel.delete()}, 5000)

    }

    async init() {
    
    }

};
