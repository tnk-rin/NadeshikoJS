const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "membercount",
    aliases: ["mc, count"],
    category: "info",
    usage: "[role_name]",
    description: "Returns the number of user's in the server. (WIP)",
  
    run: async(client, message, args) => {

        const roles = message.guild.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        const embed = new RichEmbed()
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setColor("RANDOM")
            .addField("Member count:", message.guild.memberCount);
       
        message.channel.send(embed);
    }
}