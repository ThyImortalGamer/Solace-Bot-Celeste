const klasa = require('klasa');
const config = require("./conf.json");
const database = require("./funcs/database")

const { Client } = require('klasa')

Client.defaultPermissionLevels
    .addLevel(5, true, (client, msg) => msg.guild && msg.member.roles.has('383664307243712515'))
    .addLevel(6, true, (client, msg) => msg.guild && msg.member.permissions.has('ADMINISTRATOR'));

const client = new klasa.Client({
    clientOptions: {
        fetchAllMembers: false
    },
    prefix: ['!', 'Cel, ', 'Celeste, '],
    cmdEditing: true,
    cmdLogging: true,
    typing: true,
    readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`,
    console: { useColor: true }
}); 

database.init();
client.login(config.token);