const { Command } = require('klasa');
let newstring;
const staffrole = '383664307243712515'
const everyone = '383660119218585600'
const fullmember = '383768374485712896'
const muted = '383664302583709696'
const hash = '#'
let channelmessage;
let mutereason;
let mutetype;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'supermute',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Test command. Ignore this.',
            usage: '[user:member] [args:str] [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [user, ...string]) {
        
        var newstring = string.join(' ');
        var reason = string.slice(1).join(' ')
        console.log(user)
        console.log(`s${string}e`)
        console.log(`s${newstring}e`)
        
        if(user && string == '') {
            msg.send('Muting user...')
            mutetype = 'muted'
            muteuser()
        } else {
            if(newstring == `in this channel`) {
                msg.send('Muting user in this channel.')
                mutetype = 'channel muted'
            } else {
                if(user && string[0] == 'for') {
                    msg.send(`Muting user for reason: ${reason}.`)
                    mutetype = 'muted'
                    muteuser()
                } else {
                    if(user == null && newstring == 'this channel') {
                        msg.send('Muting this channel.')
                    } else {
                        if(user == null && string[0] == 'this' && string[1] == 'channel' && string[2] == 'for') {
                            msg.send(`Muting channel for ${string[3]} minutes.`)
                            } else {
                                msg.reply('You failed.')
                            }
                        }
                    }
                } 
            }
            
            function muteuser(string) {
                if(string[0] != 'for') {
                    channelmessage = `${user}\n**You have been muted!**\n\n**Staff Member who issued mute: __${msg.author.tag}__**\n\nPlease wait for a member of staff to speak to you.`
                    mutereason = "No reason specified"
                } else {
                    channelmessage = `${user}\n**You have been muted!**\n\n**Reason: __${reason}.__**\n**Staff Member who issued mute: __${msg.author.tag}__**\n\nPlease wait for a member of staff to speak to you.`
                    mutereason = reason
                }
               
                const embed = new this.client.methods.Embed()
                .setTitle("USER MUTED")
                .setColor("#c60000")
                .setDescription(`A user (${username}) has been ${mutetype} by ${msg.author.tag}.`)
                .addField("Reason", mutereason)
                .setTimestamp();

                let username = user.user.tag.replace(" ", "_").replace("#", "_");
                let userid = user.id
        
                if(!msg.member.roles.has(staffrole)) {
                    msg.reply('You are not a staff member.')
                    return;
                } else {
                    user.setMute(true);
                    user.setDeaf(true);
                    user.removeRole(fullmember);
                    user.addRole(muted, [reason])
                            .catch(error2 => {
                                msg.send('Mute Role NOT applied.');
                            });
                    }
                    msg.send(`${user} has been muted.`)
        
                    msg.guild.createChannel('mute', 'text', {parent: '384425107810025472'})
                    .catch('Error creating channel!')
                    .then(function (editchannel) {
                        editchannel.setName(`mute_${username}`)
                        .catch(error => { setTimeout(function () {
                            editchannel.setName(`mute_${userid}`)
                            msg.send('Error naming channel, defaulted to UserID. User has been muted.')
                            }, 1000)
                        })
                        editchannel.overwritePermissions(staffrole, {
                            'ADD_REACTIONS': true,
                            'VIEW_CHANNEL': true,
                            'SEND_MESSAGES': true,
                            'MANAGE_MESSAGES': true,
                            'MANAGE_CHANNEL': true,
                            'EMBED_LINKS': true,
                            'ATTACH_FILES': true,
                            'READ_MESSAGE_HISTORY': true,
                            'MENTION_EVERYONE': true,    
                        })
                        .catch(error => {
                            msg.send('Staff Permissions NOT applied.')
                        })
                        editchannel.overwritePermissions(everyone, {
                            'VIEW_CHANNEL': false,
                        })
                        editchannel.overwritePermissions(user, {
                            'ADD_REACTIONS': true,
                            'VIEW_CHANNEL': true,
                            'SEND_MESSAGES': true,
                            'EMBED_LINKS': true,
                            'ATTACH_FILES': true,
                            'READ_MESSAGE_HISTORY': true,
                        })
                        .catch(error => {
                            msg.send('Permissions NOT applied for muted user.')
                        })
                        .then(function () {
                            editchannel.send(channelmessage)
                        })
                    })
                .then(this.chanLogs.send({ embed }))
            }
        }
        
    async init() {
        this.chanLogs = this.client.channels.get('384053405460463616');
    }

};