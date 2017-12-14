const { Command } = require('klasa');
const leader = '383714876222210071'
const jobs = '383729667884056586'

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'job',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 6,
            botPerms: [],
            requiredSettings: [],
            description: 'For leaders to create jobs with.',
            usage: '<job:str> [amount:int]',
            usageDelim: ', ',
            extendedHelp: `This is to create a job for a staff member. Do "!job this is my job, 2" to create a job called "this is my job" for two people. The amount is optional, and if left out, it will default to one.`
        });
    }

    async run(msg, [job, amount = 1]) {
        const usercolour = msg.member.displayHexColor
        const embed = new this.client.methods.Embed()
        .setColor(usercolour)
        .setDescription(`A new job by ${msg.author.username} has been placed. Please react to it with a "✅" If you want to take this on.`)
        .addField("The job:", job)
        .addField("Amount of people required:", amount)
        .setTimestamp();
    
        this.chanJobs.send({ embed });
    }

    async init() {
        this.chanJobs = this.client.channels.get(jobs);
    }

};