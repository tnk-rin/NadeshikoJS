const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "urban",
    aliases: ["urbandictionary"],
    category: "fun",
    description: "Gets the top definition for a term from urban dictionary",
    usage: "<Search>",
    example: ".urban tanaka-kun",

    run: async (client, message, args) => {
        const search = args.join(' ');
        const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define`;

        if(!search)
            return message.reply("Please provide a search query...").then(m => m.delete(5000));

        axios.get(url, {
            "headers": {
                "content-type":"application/octet-stream",
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "6b1dce1017msh53f12bb143ecb2ep1f67efjsn0177bfb6873a"
            },"params":{
                "term":search
            }
        }).then((response) => {
            // console.log(response.data.list[0].definition)

            if(!response.data.list[0])
                return message.reply(`No results found for "${search}"...`);

            const embed = new RichEmbed()
                .setTitle(response.data.list[0].word)
                .setFooter(response.data.list[0].author)
                .addField(`Definition:`, response.data.list[0].definition)
                .addField(`Example:`, response.data.list[0].example)
                .setColor("RANDOM");

            message.channel.send(embed);
        }).catch(function (error) {
            // handle error
            console.log(error);
            return message.reply(`Something went wrong... \`\`\`${error}\`\`\``)
        })
    
    }
}