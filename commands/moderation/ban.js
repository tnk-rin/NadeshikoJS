const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    category: "moderation",
    usage: "<id | mention>",
    description: "Bans the member.",

    run: async(client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        var reason;
        if(message.deletable) message.delete;

        //no mention
        if(!args[0]){
            return message.reply("Please mention a user to ban.")
                .then(m => m.delete(5000));
        }

        //no reason
        if(!args[1]){
            reason = "No reason given.";
        } else {
            reason = args.slice(1).join(" ");
        }
        
        //no user permissions
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.reply("You do not have the permissions to ban members. Please contact a staff member.")
                .then(m => m.delete(5000));
        }

        //no bot permissions
        if(!message.guild.me.hasPermission("BAN_MEMBERS")){
            return message.reply("I do not have the permissions to ban members. Please contact a staff member.")
                .then(m => m.delete(5000));
        }
        
        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);
        
        //no member found
        if(!toBan){
            return message.reply("Couldn't find that member, try again!")
                .then(m => m.delete(5000));
        }

        //no kicking yourself
        if(message.author.id === toBan.id){
            return message.reply("You can't ban yourself! 🥴")
                .then(m => m.delete(5000));
        }

        if(!toBan.kickable){
            return message.reply("I can't ban that person due to the role hierarchy, I suppose...")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor('#ff0000')
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Banned Member: ** ${toBan} (${toBan.id})
            **> Banned by: ** ${message.author} (${message.author.id})
            **> Reason: ** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor("This verification becomes invalid after 30s")
            .setDescription(`Do you want to ban ${toBan}?`);

        const alertEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`User: ${toBan} has been banned`)
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
                    channel.send(alertEmbed.setFooter(`Banned by: ${message.member.displayName}`, message.author.displayAvatarURL));

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if(err) return message.channel.send(`It looks like something is wrong with our IBM 5100. We'll get onto fixing it. ***D A R U***`);
                    })
            } else if(emoji === "❌"){
                msg.delete();

                message.reply("Ban canceled...")
                    .then(m => m.delete(5000));
            }
        });
    }
}