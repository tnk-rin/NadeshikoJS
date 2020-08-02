const { RichEmbed } = require('discord.js');
const { Utils } = require('erela.js');

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "music",
    description: "(unfinished)",

    run: async(client, message, args) => {
        const { voiceChannel } = message.member;
        
        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I do not have permission to join this voice channel...");
        if (!permissions.has("SPEAK")) return message.channel.send("I do not have permission to join this voice channel...");
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command.");
        
        const player = client.music.players.get(message.guild.id);

        if(!player) return message.reply("The bot isn't currently playing...").then(m => m.delete(5000));

        const queue = player.queue

        message.channel.send(`Currently playing: \`${queue[0].title} : ${formattedTime(queue[0].duration)}\``)

        console.log(queue[0].title)
    }
}

function formattedTime(millis){
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}