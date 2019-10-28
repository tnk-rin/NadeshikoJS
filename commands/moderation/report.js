const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention || id>, <reason>",

    run: async(client, message, args) => {
        if(message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        
        if(!rMember)
            return message.reply("I wasn't able to find them...").then(m => m.delete(3000));

        if(!rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.reply("Cannot report that member...").then(m => m.delete(3000));

        if(!args[1])
            return message.reply("Please provide a reason to report...").then(m => m.delete(3000));

        const channel = message.guild.channels.find(channel => channel.name === "reports");

        if(!channel)
            return message.channel.send("I could not find a \`#reports\` channel...").then(m => m.delete(3000));
            
        const embed = new RichEmbed()
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**Member:** ${rMember} (${rMember.id})
            **Reported by:** ${message.member} (${message.member.id})
            **Reported in:** ${message.channel}
            **Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
}