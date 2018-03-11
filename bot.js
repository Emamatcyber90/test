const Discord = require('discord.js');
const client = new Discord.Client();
var { prefix, token } = require('./config.json');
var logChannel = "welcome";
var modCase = "0";
    var tnum = 1;
client.on('ready', () => {
    // This will trigger when the bot comes online.
    console.log(`${client.user.tag} Is Active!`);
    console.log(`----------------`);
    client.user.setPresence({game: {name: `out for ${prefix}help`, type: "WATCHING"}});
});

client.on("guildMemberRemove", (u) => {
    let mcount = u.guild.channels.get("414574119221461003");
    if (mcount) {
      mcount.setName(u.guild.memberCount.toString());
    }  
});
client.on("guildMemberAdd", (u) => {
    let channel = u.guild.channels.find("name", logChannel);
    let mcount = u.guild.channels.get("414574119221461003");
    if (mcount) {
      mcount.setName(u.guild.memberCount.toString());
    }
    if (!channel) {
        return console.log(`Channel ${channel} cannot be found on ${u.guild.name}`);
      };
  channel.send({embed: {
  "title": "Member Joined!",
  "description": `:tada:\nWelcome **${u.user.tag}** to **${u.guild.name}**! The <#411214481490706463> channel includes all the you need to know information about us!`,
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": u.user.tag + " has joined!",
    "icon_url": u.user.displayAvatarURL
  }
}});
})

// Commands!
client.on('message', message => {
  if (message.author.id !== client.user.id) {
    if (message.content.match(/(http(s)?:\/\/)?discord(app)?\.(com|gg)\/[A-z0-9]+/gi)) {
      message.delete();
      message.reply('no Discord Invites!');
    }
  }
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if (message.channel.type === 'dm') { return message.reply ("You cannot use my commands in DMs!") }
    let command = message.content.split(/ +/)[0].toLowerCase();
    command = command.slice(prefix.length);

    let args = message.content.split(/ +/).slice(1);
    /*
    if(message.content.startsWith(regex + "help")) {
    	return message.reply(`My Command Prefix is \`${prefix}\`. Run \`${prefix}help\` for help with my commands!`);
    }
    if(message.content.startsWith(regex)) {
    	return message.reply(`My Command Prefix is \`${prefix}\`. Run \`${prefix}help\` for help with my commands!`);
    }
    */

    if (command === "refer") {
      if (!args[0]) {
        message.reply('Invalid Command Usage!');
      }
      if (args[0]=="leaderboard") {
        async() => {
        let inviter = await message.guild.fetchInvites().then(c => c.map(inv => inv.inviter));
        let uses = await message.guild.fetchInvites().then(c => c.map(inv => inv.uses));
        message.channel.send(inviter + uses);
        }
      }
    }

    if (command === "bug") {
      if (!args) {
        return message.reply('Incorrect Command Usage!')
      }
      client.users.get('345312965508988928').send("**"+message.author.tag+":** " + args.join(' '));
      message.delete();
      message.channel.send('Thank you for Submitting a Bug!');
    }

    if (command === "portfolio") {
      if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("Sorry, you don't have permission to use this!");
        }
      let channel = message.guild.channels.find('name', 'portfolio');
      if (!channel) {
        return message.reply('I couldn\'t find the channel "#portfolio"!');
      }
      if (args[0]) {
        if (args[0].toString().toLowerCase()=="categories") {
          message.channel.send({embed: {
  "title": "Portfolio: All Categories",
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  },
  "fields": [
    {
      "name": "Bot",
      "value": "For Bot Developers"
    },
    {
      "name": "Graphic",
      "value": "For Graphic Designers"
    },
    {
      "name": "Motion",
      "value": "For Motion Designers"
    },
    {
      "name": "Plugin",
      "value": "For Plugin Developers"
    },
    {
      "name": "Setup",
      "value": "For Setup Specialists"
    },
    {
      "name": "Thread",
      "value": "For Thread Designers"
    },
    {
      "name": "Web",
      "value": "For Web Designers"
    }
  ]
}});
          return;
        }
      }
      if (args.length<2) {
        return message.reply('Incorrect Command Usage! **Command Usage:** `'+prefix+'portfolio <category> <links|info>`. To see all categories, use the `'+prefix+'portfolio categories` command!');
      }
      switch (args[0].toString().toLowerCase()) {
        case 'web': {
          channel.send({ embed: {
              "title": "Web Developer",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;
        }
        case 'builder': {
          channel.send({ embed: {
              "title": "Builder",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;     
        }
        case 'motion': {
          channel.send({ embed: {
              "title": "Motion Designer",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;      
        }
        case 'thread': {
          channel.send({ embed: {
              "title": "Thread Designer",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;         
        }
        case 'graphic': {
          channel.send({ embed: {
              "title": "Graphic Designer",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;              
        }
        case 'plugin': {
          channel.send({ embed: {
              "title": "Plugin Developer",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;              
        }
        case 'bot': {
          channel.send({ embed: {
              "title": "Bot Developer",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;              
        }
        case 'setup': {
          channel.send({ embed: {
              "title": "Setup Specialist",
              "description": args.slice(1).join(' '),
              "color": 3862131,
              "timestamp": new Date(),
              "footer": {
                "icon_url": client.user.displayAvatarURL,
                "text": client.user.tag
              },
              "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
              }
          }});
          message.delete();
          message.channel.send(`Your Portfolio Information has been added to ${channel}!`);
          break;              
        }
      }
    }
    if (command === "message" || command === "embed") {
      if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("Sorry, you don't have permissions to use this!");
        }
        let colour = args[0];
      let channel = message.mentions.channels.first();
      let msg = args.slice(2).join(' ');
      if (!colour || !channel || !msg) {
        return message.reply('Incorrect Command Usage! **Command Usage:** `'+prefix+'embed <colour> <channel> <message>`. **Example Usage:** `'+prefix+'embed green <#411214682175569920> hello`');
      };
      message.delete();
      if (colour == "blue") {
      channel.send({ embed: {
        "description": msg,
        "color": 2003199
      }});
      return;
      }
    if (colour == "red") {
      channel.send({ embed: {
        "description": msg,
        "color": 16729856
      }});
      return;
    }
    if (colour == "green") {
      channel.send({ embed: {
        "description": msg,
        "color": 3862131
      }});
      return;
}
    if (colour == "yellow") {
      channel.send({ embed: {
        "description": msg,
        "color": 16770816
      }});
      return;
    };
channel.send({ embed: {
  "description": msg,
  "color": colour
}});
    };

    if (command === "suggest") {
      let channel = message.guild.channels.find('name', 'suggestions');
    let yes = client.emojis.get("414496237321191434");
    let no = client.emojis.get("414496237316997120");
      if (!channel) {
        return message.reply ('I could not find a channel named #suggestions!');
      }
const embed = {
  "title": "Suggestion",
  "description": args.join(' '),
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  }
};
channel.send({ embed }).then(async msg => {
  try {
  await msg.react(yes);
  await msg.react(no);
  } catch (err) {
    console.log(err);
    channel.send('Oops! I encountered a problem!')
  }
});
message.channel.send(`Thank you for suggesting, ${message.author}. It's been posted in ${channel} for the voting process.`);
message.delete();
    }

    if (command === "new") {
      let support = message.guild.roles.find("name", "Support Team");
      let ticketLogs = message.guild.channels.find('name', 'ticket-logs');
      if (!ticketLogs) {
        return message.reply("I can't find the channel \"#ticket-logs\"")
      }
      if (!support) {
        message.reply ("I can't find the role \"Support Team\"!");
        return;
      }
message.guild.createChannel("ticket-"+tnum, 'text')
  .then(channel => {
channel.overwritePermissions(message.guild.id, {
  READ_MESSAGES: false
})
channel.overwritePermissions(message.author, {
  READ_MESSAGES: true
})
channel.overwritePermissions(support.id, {
  READ_MESSAGES: true
})
channel.send("Thank you for creating a ticket. Please Describe Everything in as full detail as you can.")
message.channel.send ("✅ Created channel " + channel.toString() + "!")
  ticketLogs.send({embed: {
  "title": "New Ticket",
  "description": `Ticket ${channel} has been created`,
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  }
}});
tnum++
    })
}

    if (command === "close") {
      if(!message.channel.name.startsWith('ticket')) {
        return message.reply('This is not a Support Channel!')
      };
      let ticketLogs = message.guild.channels.find('name', 'ticket-logs');
      if (!ticketLogs) {
        return message.reply("I can't find the channel \"#ticket-logs\"")
      }
  ticketLogs.send({embed: {
  "title": "Ticket Closed",
  "description": `Ticket ${message.channel.name} has been closed`,
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  }
}});
        message.channel.delete();
        message.author.send (`✅ Closed Ticket \`${message.channel.name}\``);
    }

    
    if (command === "pm" || command === "send" || command === "dm") {
      if (message.author.id !== '345312965508988928') {
        return message.reply ('You don\'t have permission to use this command!');
      }
      if (args.length<2 || !args) {
        return message.reply('You must specify a user and a message!');
      }
      let member = message.mentions.members.first();
      member.send(args.slice(1).join(' '));
    }
    if (command === "uptime") {
    let days = Math.floor(client.uptime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((client.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((client.uptime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((client.uptime % (1000 * 60)) / 1000);
      message.channel.send ("**I'm alive!**\n**Serving Users for** " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.")
    }
    if (command === "eval") {
          if(message.author.id !== "345312965508988928" && message.author.id !== "242238447182544896") { return message.channel.send (`You do not have permission to use this, ${message.author}, you silly billy!`) };
// Clean
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
// End it
          try {
          const code = args.join(" ");
          let evaled = eval(code);

          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

            message.channel.send(`__**Output**__\n\n` + `\`\`\`js\n` + clean(evaled) + `\`\`\``);
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
    }

    if (command === "invite") {

	let invChannel = message.channel.id;
	message.guild.channels.get(invChannel).createInvite({
    temporary: false,
    maxAge: 0,
    maxUses: 0,
    unique: true,
    reason: `Created invite on demand of ${message.author.tag}`
}).then(invite => {
message.channel.send({embed: {
  "title": "Invite Created",
  "description": `You can invite your friends to **${message.member.guild.name}** using **${invite.url}!**\n\n**Note:** You will not gain referral points using this invite!`,
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  }
}});

	});

    }


    if (command === "ping") {
        
        message.channel.send('Pinging...').then(async (msg) => {

  const embed = {
  "title": "Pong!",
  "description": "🏓",
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/345312965508988928/9bf0d43728bec35bcbe3246664c9c8ff.webp",
    "text": "Just-A-Bot"
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  },
  "fields": [
    {
      "name": "Bot Latency",
      "value": `${msg.createdTimestamp - message.createdTimestamp} ms`,
      "inline": true
    },
    {
      "name": "API Latency",
      "value": `${Math.round(client.ping)} ms`,
      "inline": true
    },
    {
      "name": "What does this mean?",
      "value": `This means that the bot took ${msg.createdTimestamp - message.createdTimestamp} ms to respond to your command, and it took ${Math.round(client.ping)} ms for Discord API. This is the speed at which the bot responds to you, after you sent your command!`
    }
  ]
};


          await msg.edit({ embed });
    
        });
        
    }

        if (command === "remove" || command === "purge" || command === "clear" || command === "delete" || command === "prune") {
        
      if (message.author.id !== "345312965508988928") {
        if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("Sorry, you don't have permissions to use this!");
        }
      }

        	modlogs = message.guild.channels.find('name', 'mod-logs');
            let num1 = parseInt(args[0]);
    if (!modlogs) {
      message.guild.createChannel('mod-logs', "text");
      };
          modlogs = message.guild.channels.find('name', 'mod-logs');

    if(!num1) { return message.reply (`You need to specify a number of messages to delete.\nCommand usage: \`${prefix}purge num\``)}
    if(isNaN(num1) || num1>99 || num1<1) { return message.reply (`${num1} is an invalid number of messages to delete between 1 and 99.\nCommand usage: \`${prefix}purge num\``)}
            
            message.channel.bulkDelete(num1 + 1, true);

            if (args[0] === "1") {

                message.channel.send("Deleted " + num1 + " message.").then(msg => msg.delete(2000));

            } else if (num1 > 1) {

                message.channel.send("Deleted " + num1 + " messages.").then(msg => msg.delete(2000));

            }
modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Bulk Delete",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    },
    {
      "name": "Channel",
      "value": message.channel.name,
      "inline": true
    },
    {
      "name": "Amount Deleted",
      "value": num1,
      "inline": true
    }
  ]
}})
            
        }

        if (command === "help") {
          if (!args[0]) {
          message.channel.send({embed: {
  "title": "Command Help",
  "description": "Here you will find a list of all commands and what they do",
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  },
  "fields": [
    {
      "name": "Bot Prefix",
      "value": `All of my commands start with \`${prefix}\``
    },
    {
      "name": "suggest <suggestion>",
      "value": "Suggest an Idea"
    },
    {
      "name": "new",
      "value": "Creates a new Support Ticket"
    },
    {
      "name": "close",
      "value": "Closes a Support Ticket"
    },
    {
      "name": "invite",
      "value": "Creates a Unique Instant Invite"
    },
    {
      "name": "uptime",
      "value": "Shows how long the bot has been online for since the last restart"
    },
    {
      "name": "help",
      "value": "Shows this message"
    },
    {
      "name": "bug <info>",
      "value": "Submit a bug with the bot"
    },
    {
      "name": "Moderation Commands",
      "value": "These commands require their respective permissions, or the Administrator permission"
    },
    {
      "name": "kick <user> [reason]",
      "value": "Kicks the mentioned user for an optional reason"
    },
    {
      "name": "ban <user> [reason]",
      "value": "Bans the mentioned user for an optional reason"
    },
    {
      "name": "unban <user id> [reason]",
      "value": "Unbans a user by ID for an optional reason"
    },
    {
      "name": "purge <number>",
      "value": "Bulk-deletes a number of messages"
    },
    {
      "name": "Staff Commands",
      "value": "These commands are for the staff of Cantox"
    },
    {
      "name": "portfolio <category> <links|info>",
      "value": "Submit your Portfolio to be posted"
    },
    {
      "name": "embed <colour> <channel> <message>",
      "value": "Sends an embed using either a custom colour, or red, green, blue or yellow, in the channel specified"
    }
  ]
}});
          return;
        }
          switch (args[0].toString().toLowerCase()) { 
            case 'staff': {
          message.channel.send({embed: {
  "title": "Command Help",
  "description": "Here you will find a list of all staff commands and what they do",
  "color": 2003199,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  },
  "fields": [
    {
      "name": "Bot Prefix",
      "value": `All of my commands start with \`${prefix}\``
    },
    {
      "name": "portfolio <category> <links|info>",
      "value": "Submit your Portfolio to be posted"
    },
    {
      "name": "embed <colour> <channel> <message>",
      "value": "Sends an embed using either a custom colour, or red, green, blue or yellow, in the channel specified"
    }
  ]
}});
  break;              
            }
          }
        }
        // Mod Commands

       // Start Kick
        if(command === "kick") {
    	if (message.author.id !== "345312965508988928") {
        if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("Sorry, you don't have permissions to use this!");
        }
      }
    let member = message.mentions.members.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    if (!modlogs) {
    	return message.reply (`I could not find a channel called #mod-logs. Please create one to use this command`)
    }
    if(!member)
      return message.reply("Please @mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');   
    if (!reason) {
    member.kick(`No Reason - by ${message.author}`)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.channel.send (`**✅ ${member} was Kicked**`).then(msg => msg.delete(3000));
    } else {
    member.kick(`${reason} - On command of ${message.author}`)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
	message.channel.send (`**✅ ${member} was Kicked for \`${reason}\`**`).then(msg => msg.delete(3000));
    }
    if (reason) {
            modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Kick",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    },
    {
      "name": "Reason",
      "value": "```" + reason + "```"
    }
  ]
}})
} else {
            modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Kick",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    }
  ]
}}) 
}
  }

  // End Kick
  // Start Unban

  if(command === "unban") {

  let id = args[0];
	let reason = args.slice(1).join(' ');
  let modlogs = message.guild.channels.find('name', 'mod-logs');
  if (!modlogs) {
    message.reply('I couldn\'t find a channel called "#mod-logs"!')
  }
      if (message.author.id !== "345312965508988928") {
        if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("Sorry, you don't have permissions to use this!");
        }
      }
  	if (!id) {
  		message.reply("You must have an ID to unban!");
  		return;
  	};
    if (reason) {
            modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Unban",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    },
    {
      "name": "Reason",
      "value": "```" + reason + "```"
    }
  ]
}})
} else {
            modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Unban",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    }
  ]
}}) 
}
  	message.guild.unban(id, `${reason} - On command of ${message.author}`)
  .then(user => message.channel.send(`**✅ ${id} was Unbanned for \`${reason}\`**`).then(msg => msg.delete(3000)))
  .catch(err => message.channel.send (`I couldn't unban ${id} because: \`\`\`js\n${err}\`\`\``));
  }
  // End Unban
  // Start Ban
  if(command === "ban") {
      if (message.author.id !== "345312965508988928") {
        if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("Sorry, you don't have permissions to use this!");
        }
      }
    let member = message.mentions.members.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    if (!modlogs) {
    	return message.reply (`I could not find a channel called #mod-logs. Please create one to use this command`)
    }
    if(!member)
      return message.reply("Please @mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    
    member.ban(`${reason} - On command of ${message.author}`)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(`**✅ ${member} was Banned for \`${reason}\`**`).then(msg => msg.delete(3000));
    if (reason) {
            modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Ban",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    },
    {
      "name": "Reason",
      "value": "```" + reason + "```"
    }
  ]
}})
} else {
            modlogs.send({embed: {
  "color": 16729856,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "fields": [
    {
      "name": "Action",
      "value": "Ban",
      "inline": true
    },
    {
      "name": "Moderator",
      "value": message.author.tag,
      "inline": true
    }
  ]
}}) 
}
  }
  // End Ban
});
client.login(token);
