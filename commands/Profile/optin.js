const { Command } = require('klasa');
const fullmember = '383768374485712896'
const path = require("path")
const database = require(path.resolve(__dirname, "../../funcs/database.js"))


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'optin',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to opt-in to our rules, and data storage policy. You will then be given the "Noble" role, and access to all of our channels.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {

        if(msg.member.roles.has(fullmember)) {
            msg.send('You have already opted in!')
            return;
        }
        if (msg.member.roles.has(fullmember)) {
            msg.send('You have already opted in!')
            return;
        }
        database.query(`REPLACE INTO members (userId, has) VALUES (${msg.author.id}, 1)`, [], (err, rows, fields) => {
            if (err) return console.log("Error on replace into members:\n" + err)
        });
        database.query(`INSERT INTO premium (userId, has) VALUES (${msg.author.id}, 0)`, [], (err, rows, fields) => {
            if (err) return console.log("Error on replace into premium:\n" + err)
        });
        msg.send('You have now opted in. Thank you!')
}

    async init() {
        
    }


};