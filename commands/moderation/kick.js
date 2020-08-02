const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    usage: "<id | mention>",
    description: "Kicks the member.",

    run: async(client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        var reason;

        if(message.deletable) message.delete;

        //no mention
        if(!args[0]){
            return message.reply("Please mention a user to kick.")
                .then(m => m.delete(5000));
        }
        
        //no reason
        if(!args[1]){
            reason = "No reason given.";
        } else {
            reason = args.slice(1).join(" ");
        }

        //no user permissions
        if(!message.member.hasPermission("KICK_MEMBERS")){
            return message.reply("You do not have the permissions to kick members. Please contact a staff member.")
                .then(m => m.delete(5000));
        } else if(message.author.id === process.env.OWNER_ID) {}

        //no bot permissions
        if(!message.guild.me.hasPermission("KICK_MEMBERS")){
            return message.reply("I do not have the permissions to kick members. Please contact a staff member.")
                .then(m => m.delete(5000));
        }
        
        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);
        
        //no member found
        if(!toKick){
            return message.reply("Couldn't find that member, try again!")
                .then(m => m.delete(5000));
        }

        //no kicking yourself
        if(message.author.id === toKick.id){
            return message.reply("You can't kick yourself! Unless... :smirk: :flushed:")
                .then(m => m.delete(5000));
        }

        if(!toKick.kickable){
            return message.reply("I can't kick that person due to the role hierarchy, I suppose...")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor('#ff0000')
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Kicked Member: ** ${toKick} (${toKick.id})
            **> Kicked by: ** ${message.author} (${message.author.id})
            **> Reason: ** ${reason}`);

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor("This verification becomes invalid after 30s")
            .setDescription(`Do you want to kick ${toKick}?`);

        const alertEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`User: ${toKick} has been kicked`)
            .setDescription(`**Reason: ** ${reason}`)
            .setFooter("This message will delete itself after 10s");

        message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if(emoji === "✅"){
                msg.delete();

                message.channel.send(alertEmbed)
                    .then(m => m.delete(10000));

                const channel = message.guild.channels.find(channel => channel.name === "reports");

                if(channel)
                    channel.send(alertEmbed.setFooter(`Kicked by: ${message.member.displayName}`, message.author.displayAvatarURL));

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if(err) return message.channel.send(`It looks like something is wrong with our IBM 5100. We'll get onto fixing it. ***D A R U***`);
                    })
            } else if(emoji === "❌"){
                msg.delete();

                message.reply("Kick canceled...")
                    .then(m => m.delete(5000));
            }
        });
    }
}