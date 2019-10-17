const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    category: "owner",
    description: "says anything that is input",
    usage: "<INPUT>",
    
    run: async (client, message, args) => {
        if(message.author.id === process.env.OWNER_ID){
            if(message.deletable) message.delete();
        
            if(args.length < 1)
                return message.reply("Nothing to say?").then(m => m.delete(5000));
        
            const roleColor = message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor;
        
            if(args[0].toLowerCase() === "embed"){
                const embed = new RichEmbed()
                    .setColor(roleColor)
                    .setDescription(args.slice(1).join(" "));
                
                message.channel.send(embed);
        
            } else {
                message.channel.send(args.join(" "));
            }

        } else {

            message.channel.send("This is an owner only command.")
        
        }
    }

}

