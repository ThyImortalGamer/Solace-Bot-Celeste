let sql = require('sqlite');
const moment = require('moment')
sql.open("../db/SOLACE.sqlite")
let ventchannel;

module.exports = {

    run(message, staff, author) {
        if(!staff) {
            sql.run("CREATE TABLE IF NOT EXISTS vents (userId TEXT, vent TEXT, date TEXT)")
            sql.run("INSERT INTO vents (userId, vent, date) VALUES (?, ?, ?)", author, message, moment.utc().format("dddd, MMMM Do YYYY, h:mm:ss a"))
        ventchannel = this.client.guilds.get('383660119218585600').channels.get('385043868783214594')
        } else {
            sql.run("CREATE TABLE IF NOT EXISTS staffvents (userId TEXT, vent TEXT, date TEXT)")
            sql.run("INSERT INTO vents (userId, vent, date) VALUES (?, ?, ?)", author, message, moment.utc().format("dddd, MMMM Do YYYY, h:mm:ss a"))
        ventchannel = this.client.guilds.get('383660119218585600').channels.get('384267589037326336')
        }


        const embed = new this.client.methods.Embed()
        .setTitle("ANONYMOUS VENT")
        .setDescription("To post an anonymous vent, go to dms with the bot and use the command vent followed by your message, the bot will then post your vent anonymously here.")
        .setColor("#edff2d")
        .addField("Vent content:", message)
        .addField("DISCLAIMER", "__***Vents are logged with their author in the event of abuse, the log will never be looked at unless a vent violates guild rules.***__")
        .setTimestamp();

        ventchannel.send({ embed })
    }

}