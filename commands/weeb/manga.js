const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");
const isReachable = require('is-reachable');

module.exports = {
    name: "manga",
    aliases: ["malmanga", "mangasearch"],
    category: "weeb",
    usage: "<search>",
    example: ".manga dr. stone",

    run: async(client, message, args) => {
        const search = args.join('%20');

        if (await isReachable('myanimelist.net') == false)
        return message.reply("MyAnimeList servers are currently down, please try again later...").then(m => m.delete(3000));

        if (await isReachable('api.jikan.moe') == false)
            return message.reply("The api is currently not responding, please try again later...").then(m => m.delete(3000));
            
        if (!search) {
            return message.reply("Please enter a search query.").then(m => m.delete(5000));    
        } else {
            let url = `https://api.jikan.moe/v3/search/manga?q=${search}&page=1`
            axios.get(url).then((response) => {
                let status = "";
                let selection = 0;

                const results = response.data.results;
                if(!results){
                    return message.reply("No results found.").then(m => m.delete(5000));
                } else {
                    
                    if(results[selection].publishing){
                        status = "Publishing";
                    } else {
                        if(results[selection].start_date == null){
                            status = "Not yet published";
                        } else if(results[selection].start_date != null && results[selection].end_date != null){
                            status = "Finished publishing";
                        }
                    }                    

                    const embed = new RichEmbed()
                        .setThumbnail(results[selection].image_url)
                        .setTitle(`Title: ${results[selection].title}`)
                        .addField('----------------------------------------------------------------------------------', stripIndents`**Description:** *${results[selection].synopsis}*
                        **Type:** *${results[selection].type}*
                        **Rating:** *${results[selection].score}*
                        **Status:** ${status}`)
                        .setColor(message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor)
                        .setURL(results[selection].url);

                    message.channel.send(embed);
                }
            })
        }
    }
}