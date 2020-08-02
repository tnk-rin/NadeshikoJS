const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "changenick",
    category: "moderation",
    usage: "<mention>",
    description: "Changes nickname of mentioned user.",

    run: async(client, message, args) => {

        return message.react('😳');
        // if(message.author.id == process.env.OWNER_ID) {
        //     message.mentions.setNickname(args.join(' '));
        //     message.react('✅');
        // } else {
        //     message.react('❌');
        // }
        // return;
    }
}