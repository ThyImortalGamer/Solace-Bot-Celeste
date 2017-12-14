const { Command } = require('klasa');
const fullmember = '383768374485712896'
const path = require("path")
const database = require(path.resolve(__dirname, "../../funcs/database.js"))

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'optout',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to optout of our rules, and data storage policy. You will have the noble role removed, and access to our channels denied.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        if(!msg.member.roles.has(fullmember)) {
            msg.send('You aren\'t a full member yet.')
            return;
        }
        database.query(`REPLACE INTO members (userId, has) VALUES (${msg.author.id}, 0)`, [], (err, rows, fields) => {
            if (err) return console.log("Error on replace into members:\n" + err)
        });
        database.query(`INSERT INTO premium (userId, has) VALUES (${msg.author.id}, 0)`, [], (err, rows, fields) => {
            if (err) return console.log("Error on replace into premium:\n" + err)
        });
        msg.send('You have now opted out. Bye!')
    }

    async init() {
        
    }

};
