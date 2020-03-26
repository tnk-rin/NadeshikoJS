const { RichEmbed } = require('discord.js');
const { Utils } = require('erela.js');

module.exports = {
    name: "leave",
    aliases: ["disconnect", "stop"],
    category: "music",
    description: "(unfinished)",

    run: async(client, message, args) => {
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command.");

        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I do not have permission to join this voice channel...");
        if (!permissions.has("SPEAK")) return message.channel.send("I do not have permission to join this voice channel...");

        const player = client.music.players.get(message.guild.id);

        if(!player) return message.reply("The bot isn't currently playing...").then(m => m.delete(5000));

        client.music.players.destroy(player.guild.id);


    }    
}