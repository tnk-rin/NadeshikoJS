const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");

module.exports = {
    name: "manga",
    aliases: ["malmanga", "mangasearch"],
    category: "weeb",
    usage: "<search>",
    example: ".manga dr. stone",

    run: async(client, message, args) => {
        const search = args.join('%20');

        if(process.env.MAL == "offline"){
            return message.reply("This command is temporarily unavaliable due to the DDOS outages that MAL has been experiencing...").then(m => m.delete(5000));
        }

        if (!search) {
            return message.reply("Please enter a search query.").then(m => m.delete(5000));    
        } else {
            let url = `https://api.jikan.moe/v3/search/manga?q=${search}&page=1`
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