const { RichEmbed, DMChannel } = require("discord.js");

module.exports = {
    name: "suggest",
    aliases: ["bugreport", "bug"],
    category: "info",
    usage: "<suggestion/bug>",
    example: ".suggest S add math command || .bug B bot returns x",
    description: "Send Tanaka bugs or suggestions for the bot.",

    run: async (client, message, args) => {
        const dm = message.guild.member(process.env.OWNER_ID);
        const sliced = args.slice(1);
        let type = "";

        if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("Only moderators can submit reports, please contact a moderator first...").then(m => m.delete(5000));

        if(args[0] == 'S'){
            type = "Suggestion";
        } else if (args[0] == 'B'){
            type = "Bug";
        } else {
            return message.reply("Please define the report, (S)uggestion or (B)ug...").then(m => m.delete(5000));
        }
      
        const embed = new RichEmbed()
            .setColor("RED")
            .setTitle(type)
            .setURL(message.url)
            .addField(message.guild.name, sliced.join(' '))
            .setTimestamp(message.createdAt);

        dm.send(embed);

    }

}