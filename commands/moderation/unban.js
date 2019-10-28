const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "unban",
    category: "moderation",
    usage: "<id>",
    description: "Unbans the member",

    run: async(client,message, args) => {
        message.reply("Tanaka hasn't finished coding this command. Please use manual unbans for now.")
            .then(m => m.delete(5000));
    }

    // run: async(client, message, args) => {
    //     const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

    //     if(message.deletable) message.delete;

    //     //no user permissions
    //     if(!message.member.hasPermission("BAN_MEMBERS")){
    //         return message.reply("You do not have the permissions to ban members. Please contact a staff member.")
    //             .then(m => m.delete(5000));
    //     } else if(message.author.id === process.env.OWNER_ID) {}

    //     //no bot permissions
    //     if(!message.guild.me.hasPermission("BAN_MEMBERS")){
    //         return message.reply("I do not have the permissions to ban members. Please contact a staff member.")
    //             .then(m => m.delete(5000));
    //     }

    //     const toUnban = message.mentions.members.first() || message.guild.members.get(args[0]);

    //     const promptEmbed = new RichEmbed()
    //         .setColor("GREEN")
    //         .setAuthor("This verification becomes invalid after 30s")
    //         .setDescription(`Do you want to unban id: ${toUnban}?`);

    //     const alertEmbed = new RichEmbed()
    //         .setColor("GREEN")
    //         .setAuthor(`User: ${toUnban} has been unbanned`)
    //         .setFooter("This message will delete itself after 10s");
        
    //     message.channel.send(promptEmbed).then(async msg => {
    //         const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

    //         if(emoji === "✅"){
    //             msg.delete();

    //             message.guild.unban(toUnban.id)
    //                 .catch(err => {
    //                     if(err) return message.channel.send(`It looks like something is wrong with our IBM 5100. We'll get onto fixing it. ***D A R U***`);
    //                 })
                
    //             message.channel.send(alertEmbed)
    //                 .then(m => m.delete(10000));
                
    //             } else if(emoji === "❌"){
    //             msg.delete();

    //             message.reply("Unban canceled...")
    //                 .then(m => m.delete(5000));
    //         }
    //     });

        
    // }
}