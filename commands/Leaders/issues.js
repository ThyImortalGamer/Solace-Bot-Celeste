const { Command } = require('klasa');

var templateChannel

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'issue',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 6,
            botPerms: [],
            requiredSettings: [],
            description: 'For leaders to create issue channels with.',
            usage: '<name:str> [topic:str]',
            usageDelim: ', ',
            extendedHelp: 'Use this to create an issue channel. You may do \'!issue learn how to use issue commands, this is how to use issue commands\' - this will create a issue channel called \"learn how to use issue commands\", with a topic of \"this is how to use issue commands. The topic is optional.\"'
        });
    }

    async run(msg, [name, topic = '']) {
        
        name = name.split(" ")
        name = name.join("_")

        database.query("SELECT * FROM issues", [], (err, rows, fields) => {
            if (err) console.log("Error on issue table selection:\n" + err)
            templateChannel.clone({name:`issue-${rows[0].issueNum}-${name}`}).then(tChannel => tChannel.setTopic(topic).then(tChan => tChan.setParent("383719583124553729"))).catch(e => {
                
                if(e.message == "Invalid Form Body\nname: Text channel names must be alphanumeric with dashes or underscores.") {
                    setTimeout(function () {msg.channel.send("Channel name invalid, please only use alphanumeric symbols `a-z, A-Z, and numbers` and dashes `-` and underscores `_`");}, 100)
                } else {
                    setTimeout(function () {msg.channel.send(e.message)}, 100)
                }
            }).then(tC => {         
                    if(!this.client.channels.find('name',`issue-${rows[0].issueNum}-${name}`)) return msg.reply("An error occured when creating issue channel.")
                    msg.reply(`Issue channel <#${this.client.channels.find('name',`issue-${rows[0].issueNum}-${name}`).id}> created.`)
                    database.query(`REPLACE INTO issues (issue, issueNum) VALUES (${rows[0].issue}, ${rows[0].issueNum+1})`, [], (err, rows, fields) => {
                        if (err) console.log("Error on issue table replace:\n" + err)
                    })
                });
        });
        
    }
    
    async init() {
        templateChannel = this.client.channels.find('name','issue-0-template')
    }

};