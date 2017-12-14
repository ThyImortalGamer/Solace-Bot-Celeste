const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'shop',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to inspect what is avialable in the shop.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        const display = new RichDisplay(new this.client.methods.Embed()
            .setAuthor(msg.author.username)
            .setTitle('Shop')
            .setDescription(`This is the shop. Use the reactions to scroll through.`)
        );

        display.addPage(template =>
            template.addField('Premium', `This gives you the premium membership role, and added bonuses. \n Cost: **10000 Soul Points.** \n Use "!buy premium" to purchase this.`)
            .setColor("#00b3a0")
        );
        
        display.run(await msg.send('Loading shop...'), {
            firstLast: false,
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};