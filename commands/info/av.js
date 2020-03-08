const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "av",
    aliases: ["avatar, pfp, avi"],
    category: "info",
    usage: "[Mention || User ID]",

    run: async (client, message, args) => {
        const member = getMember(message, args.join(' '));

        const embed = new RichEmbed()
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)
            .setImage(member.user.displayAvatarURL);
        
        message.channel.send(embed);
        if(!member)
            await message.channel.send(`${message}`)
    }
}