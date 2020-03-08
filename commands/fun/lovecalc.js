const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "lovecalc",
    aliases: ["ship", "marry"],
    category: "fun",
    usage: "[mention || id || username]",
    example: ".ship @Tanaka Shimarin",

    run: async(client, message, args) => {
        let person = getMember(message, args[0]);
        
        if(!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.floor(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("#FFb6c1")
            .addField(`**${message.member.displayName}** x **${person.displayName}**`, `Its a ${love}% match!`)
            .addField(loveLevel, "_ _")
            .setThumbnail(person.user.displayAvatarURL);

        message.channel.send(embed);

    }
}