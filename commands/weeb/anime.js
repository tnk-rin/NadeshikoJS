const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");
const isReachable = require('is-reachable');

module.exports = {
    name: "anime",
    aliases: ["malsearch", "animesearch"],
    category: "weeb",
    usage: "<search>",
    example: ".anime steins;gate",

    run: async(client, message, args) => {
        const search = args.join('%20');

        if (await isReachable('myanimelist.net') == false)
            return message.reply("MyAnimeList servers are currently down, please try again later...").then(m => m.delete(3000));

        if (await isReachable('api.jikan.moe') == false)
            return message.reply("The api is currently not responding, please try again later...").then(m => m.delete(3000));

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
                        .addField('----------------------------------------------------------------------------------', stripIndents`**Description:** *${results[selection].synopsis}*
                        **Type:** *${results[selection].type}*
                        **Rating:** *${results[selection].score}*
                        **Link:** ${results[selection].url}`)
                        .setColor(message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor);

                    message.channel.send(embed);
                }
            })
        }
    }
}