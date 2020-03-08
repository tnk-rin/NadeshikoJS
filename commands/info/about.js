const { RichEmbed } = require('discord.js');

module.exports = {
    name: "about",
    category: "info",
    description: "Returns info about the bot. (unfinished)",
    
    run: async (client, message, args) => {
        let id = client.user;

        // console.log(id.displayAvatarURL)
        const embed = new RichEmbed()
            .setTitle(`About ${client.user.username}`)
            .addField("Backend:", `Node: ${process.version}\nUpdate: ${process.env.VERSION}\nDiscord.js: v11.5.1\nAxios: v0.19\nDanbooru Wrapper: v3.1`)
            .setColor("RANDOM")
            .setThumbnail(id.displayAvatarURL);
            
        message.channel.send(embed);
        return;
    
    }
}