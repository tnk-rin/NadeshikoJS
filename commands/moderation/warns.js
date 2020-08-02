const { RichEmbed } = require("discord.js"), fs = require("fs");
const { promptMessage, getMember } = require("../../functions.js");
let userList = JSON.parse(fs.readFileSync("./json/userList.json"));
module.exports = {
    name: "warns",
    category: "moderation",
    aliases: ["warnings"],
    usage: "<id | mention | 'id'> [warn number | warn uid]",
    description: "Returns x",
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

        //runs if all checks pass
        let warns = 0;
        
        //get array of warns and print them to an embed
        let data = "";
        let cycle = 1;
        let arr = userList[toWarn].warns[GID];

        if(Object.keys(arr).length == 0){
            console.log(Object.keys(arr).length)
            return message.reply("This user has no warns.").then(m => m.delete(5000));
        }

        if(args[1]) {
            let embed = new RichEmbed()
                .setTitle(`Warns for \`@${member.displayName}\``)
                .setDescription(`${JSON.stringify(userList[toWarn].warns[GID][args[1]], undefined, 4)}`);
            message.channel.send(embed);
            fs.closeSync(2);
        } else if(isNaN(args[1])) {
            return message.reply(`\`${args[1]}\` is not a valid input, please use a number...`).then(m => m.delete(5000));
        }

        // const embed = new RichEmbed()
        //     .setFooter(`Requested by: ${message.member.displayName}`, message.author.displayAvatarURL)
        //     .setDescription(data)
        //     .setTitle(`Warn ${args[1]} for \`${member.displayName}\``)
        //     .setThumbnail(member.user.displayAvatarURL);

        
        
        // return message.channel.send(embed);

    }
}