const { RichEmbed } = require("discord.js"), fs = require("fs");
const { promptMessage, getMember } = require("../../functions.js");
let userList = JSON.parse(fs.readFileSync("./json/userList.json"));
module.exports = {
    name: "removewarn",
    category: "moderation",
    usage: "<id | mention>",
    aliases: ["rwarn", "rmwarn"],
    description: "Removes a specified warning from a user.",
    run: async(client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        const GID = (message.guild.id);
        const member = getMember(message, args.join(' '))
        const toWarn = member.id;
                
        if(message.deletable) message.delete;

        //no mention
        if(!args[0]){
            return message.reply("Please mention a user to warn or provide an id.")
                .then(m => m.delete(5000));
        }

        //no user permissions
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.reply("You do not have the permissions to see a member's warns. Please contact a staff member.")
                .then(m => m.delete(5000));
        }
                
        //no member found
        if(!toWarn){
            return message.reply("Couldn't find that member, try again!")
                .then(m => m.delete(5000));
        }
    }
}