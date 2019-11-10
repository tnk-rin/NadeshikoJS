const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "clear",
    category: "moderation",
    aliases: ["purge", "nuke"],
    usage: "[limit] (Default: 5)",
    description: "Clears the specified number of messages.",

    run: async(client,message, args) => {
        if (message.deleteable) {
            message.delete();
        }
        //Member has no permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You can't delete messages baka...").then(m => m.delete(5000));
        }

        //Check if args[0] is a number
        if (isNaN(args[0])){
            return message.reply(`\`${args[0]}\` isn't a number... :thinking:`).then(m => m.delete(5000));
        } else if (parseInt(args[0] <= 0)){
            return message.reply("I can't delete 0 messages...").then(m => m.delete(5000));
        }

        //Bot has no permissions
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Sorry... I can't delete messages...").then(m => m.delete(5000));
        }

        let deleteAmount;

        if(parseInt(args[0] > 100)) {
            deleteAmount = 100;
        } else {
            deleteAmount = Math.round(parseInt(args[0]));
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`).then(m => m.delete(5000)))
            .catch(err => message.reply(`Something went wrong... \`\`\`${err}\`\`\``).then(m => m.delete(5000)));
    }
}