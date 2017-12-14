const { Command } = require('klasa');
const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"))

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 15,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to check for spamscore. It has a 15 second cooldown.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        database.query(`SELECT * FROM spamScores WHERE userId ="${msg.author.id}"`, [], (err, rows, fields) => {
            rows.forEach(row => {
                return msg.reply(`Your spam score is ${row.points}. Starting at 10 points you will be warned, and at 15 points you will be muted.`)
            })
        })
    }

    async init() {

    }

};