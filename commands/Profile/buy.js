const { Command } = require('klasa');
const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"))

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'buy',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to buy an item from the !shop',
            usage: '<item:str>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [item]) {
        if(item == 'premium') {
            database.query(`SELECT * FROM profiles WHERE userId ="${msg.author.id}"`, [], (err, rows, fields) => {
                rows.forEach(row => {
                    if (!row) {
                        return msg.reply(`You haven't got a DB entry. If you haven't already, please do !optout, then !optin and you will get one. If you think this is a mistake, please contact one of our Keepers of the Code.`);
                    }
                    if(row.credits < 100) {
                        return msg.reply('You don\'t have enough for this!')
                    }
                database.query(`UPDATE profiles SET credits = '${row.credits - 100}' WHERE userId ="${msg.author.id}"`)
                    msg.member.addRole('389510234156302336')
                    .then(something => { msg.reply('you now have the premium member role! Well done!')})
                    .catch(err => { console.log(err); msg.send('There was an issue giving you the role.')})
                })
            })
        } else {
            msg.reply('That shop item doesn\'t exist (yet?)')
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};