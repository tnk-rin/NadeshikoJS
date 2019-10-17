const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    usage: "[username, id, mention]",

    run: async (client, message, args) => {
        const member = getMember(message, args.join(' '));

        //Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        //User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

            .addField('Member Information:', stripIndents`**Display name: ** ${member.displayName}
            **Joined at:** ${joined}
            **Roles:** ${roles}`, true)

            .addField('User Information:', stripIndents`**ID: **${member.user.id}k
            **Discord Tag:** ${member.user.tag}
            **Joined Discord on:** ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Currently playing:', `**Name: ** ${member.user.presence.game.name}`)


        if(!member)
            await message.channel.send(`${message}`)
        message.channel.send(embed);

    }
}