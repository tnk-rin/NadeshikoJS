const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");

module.exports = {
    name: "anime",
    aliases: ["malsearch", "animesearch"],
    category: "weeb",
    usage: "<search | g (tag)>",
    example: ".saucepls big boobs | .saucepls 177013",

    run: async(client, message, args) => {
        const search = args.join('%20');

        if (!search) {
            return message.reply("Please enter a search query.").then(m => m.delete(5000));    
        } else {
            let url = `https://api.jikan.moe/v3/search/anime?q=${search}&page=1`
            axios.get(url).then((response) => {
                
                let selection = 0;

                const results = response.data.results;
                if(!results){
                    return message.reply("No results found.").then(m => m.delete(5000));
                } else {
                    // const tag = results.tags;
                    // let s = '';
                    // tag.forEach(v => s+=`${v.name}, `);
                    // console.log(s);

                    

                    const embed = new RichEmbed()
                        .setThumbnail(results[selection].image_url)
                        .setTitle(`Title: ${results[selection].title}`)
                        .addField('Details:', stripIndents`**Description:** *${results[selection].synopsis}*
                        **Type:** *${results[selection].type}*
                        **Rating:** *${results[selection].score}*`)
                        .setColor(message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor);

                    message.channel.send(embed);
                }
            })
        }
    }
}