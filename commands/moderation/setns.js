const { RichEmbed } = require('discord.js');
const fs = require("fs");

module.exports = {
    name: "setns",
    category: "moderation",
    usage: "[nothing]",
    description: "changes the state of NSFW content in non-nsfw channels",
    
    run: async(client, message, args) => {
        //Permission check
        // if(!message.member.hasPermission("ADMINISTRATOR")){
        //     return message.reply("You do not have the permissions to change this...")
        //         .then(m => m.delete(3000));
        // }

        // if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        //     return message.reply("I do not have the permissions to change this...")
        //         .then(m => m.delete(5000));
        // }

        //Main Code
        let currentState = JSON.parse(fs.readFileSync('././serverSettings.json'));
        let id = message.guild.id;
        
        if(currentState.nsfwEnable === `599076003247030275_true`){
            console.log("yeetus")
            let status = {
                nsfwEnable: `${id}_false`
            }
            let data = JSON.stringify(status);
            fs.writeFileSync('././serverSettings.json', data);
            message.reply("NSFW content disabled...").then(m => m.delete(3000));
        } else {
            console.log("yootus")
            let status = {
                nsfwEnable: `${id}_true`
            }
            let data = JSON.stringify(status);
            fs.writeFileSync('././serverSettings.json', data);
            message.reply("NSFW content enabled...").then(m => m.delete(3000));
        }
        // console.log(status)
        
    }
}