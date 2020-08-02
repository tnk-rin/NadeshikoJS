const { RichEmbed } = require("discord.js"), fs = require("fs");
const { promptMessage, getMember } = require("../../functions.js");
let userList = JSON.parse(fs.readFileSync("./json/userList.json"));

module.exports = {
    name: "removewarn",
    category: "moderation",
    usage: "<user_id> [warn_id]",
    aliases: ["rwarn", "rmwarn"],
    description: "Removes a specified warning from a user. Or removes a user's warnings entirely.",
    run: async(client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        const guild_id = (message.guild.id);
        const user_id = args[0];
        

        //no user permissions
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.reply("You do not have the permissions to remove a member's warns. Please contact a staff member.")
                .then(m => m.delete(5000));
        }
                
        //no member found
        // if(!args[1]){
        //     return message.reply("Couldn't find that member, try again!")
        //         .then(m => m.delete(5000));
        // }

        if(args[1]) {
            const warn_id = args[1];
            //remove specific warning
            return message.react('😳');
        } else {
            const promptEmbed = new RichEmbed()
                .setColor("GREEN")
                .setAuthor("This verification becomes invalid after 30s")
                .setDescription(`Do you want to remove all of ${user_id}'s warns?`);
                
            const alertEmbed = new RichEmbed()
                .setColor("GREEN")
                .setAuthor(`${user_id}'s warns have been removed!`);

            message.channel.send(promptEmbed).then(async msg => {
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
                if(emoji === "✅"){
                    msg.delete();
                    message.channel.send(alertEmbed);
                    const channel = message.guild.channels.find(channel => channel.name === "reports");
                    if(channel)
                        channel.send(alertEmbed.setFooter(`Removed by: ${message.member.displayName}`, message.author.displayAvatarURL));
                    /* code to remove warns */
                    delete userList[user_id].warns[guild_id];
                    let strData = JSON.stringify(userList)
                    message.react('✅');
                    fs.writeFileSync('./json/userList.json', strData);
                    fs.closeSync(2);
                    /* goes here */
                } else if(emoji === "❌"){
                    msg.delete();
                    message.reply("Canceled...")
                        .then(m => m.delete(5000));
                }
            });
        }
    }
}