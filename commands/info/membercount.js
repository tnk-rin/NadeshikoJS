const { RichEmbed, Role } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "membercount",
    aliases: ["mc", "count"],
    category: "info",
    usage: "[id] [role name/id]",
    example: ".mc Admins || .mc id 622283325851303956",
    description: "Returns the number of users in the server or with a specified role.",
  
    run: async(client, message, args) => {
        const embed = new RichEmbed()
        let id = 0;
        if(!args[0]){   
            embed.setFooter(message.author.username, message.author.displayAvatarURL)
                .setColor("RANDOM")
                .setTitle("Member count:")
                .setDescription(message.guild.memberCount);
        } else {
            if(args[0] == "id") {
                id = args[1];
            } else {
                const roleReturn = message.guild.roles.find(roles => roles.name === args.join(' '))
                if (!roleReturn) {
                    return message.channel.send(`Could not find role with name: \`${args.join(' ')}\`...`).then(m => m.delete(5000));
                }
                id = roleReturn.id;
            }

            const role = new Role(message.guild, message.guild.roles.get(id))
            let membersWith = message.guild.roles.get(id).members;
            embed.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
                .setColor(role.hexColor)
                .setTitle(`Members with role \`${role.name}\`:`)
                .setDescription(role.members.size);
        }
        message.channel.send(embed);
    }
}