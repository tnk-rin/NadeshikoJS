// https://cdn.discordapp.com/attachments/435995570289770518/635953097428041738/poopy.png

const { RichEmbed } = require("discord.js");

module.exports = {
    name: "hahapoopy",
    category: "fun",
    description: "poopy haha",

    run: async(client, message, args) => {

        const embed = new RichEmbed()
            .setImage("https://cdn.discordapp.com/attachments/435995570289770518/635953097428041738/poopy.png");

        message.channel.send(embed);
        
    }    
}