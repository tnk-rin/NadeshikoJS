const { RichEmbed } = require("discord.js"), fs = require("fs"), axios = require("axios"), isReachable = require("is-reachable");
const osuAPIKey = "331d019695c3a3a72c67daba5a2502e56e6089ed";

module.exports = {
    name: "osureset",
    aliases: ["resetosu", "resetosuname"],
    category: "osu",
    example: ".resetosu",
    run: async(client, message, args) => {
        /*
        let UID = (message.author.id);
        let dataJSON = JSON.parse(fs.readFileSync('./json/userList.json'));
        if(!dataJSON.osu.hasOwnProperty(UID))
            return message.reply("You haven't linked an osu account to your discord, please do so with `.setosu`").then(m => m.delete(5000));
            
        delete dataJSON.osu[UID];
        let jsonStr = JSON.stringify(dataJSON);
        fs.writeFileSync('./json/userList.json', jsonStr)
        message.react('✅');
        */
       return message.channel.send("This command is not complete...").then(m => m.delete(3000));
    }
}