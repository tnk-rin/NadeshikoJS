const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");
const fs = require("fs");

module.exports = {
    name: "saucepls",
    aliases: ["nhentai", "hentaisearch", "hentai"],
    category: "weeb",
    usage: "<search | g (tag)>",
    example: ".saucepls big boobs | .saucepls g 273405",

    run: async(client, message, args) => {
        const search = args.join(' ');
        let nsfwOnly = JSON.parse(fs.readFileSync('././serverSettings.json'));
        if (!message.channel.nsfw && nsfwOnly.nsfwEnable === `${message.guild.id}_false`) {
            return message.reply("This command only works in channels marked NSFW...").then(m => m.delete(3000));
        }
        if (!search){
            return message.reply("Please enter a search query.").then(m => m.delete(5000));
        } else {
            
            if(args[0] === 'g'){
                let url = `https://nhentai.net/api/gallery/${args[1]}`
                axios.get(url).then((response) => {
                    
                    const results = response.data;

                    if(!results){
                        return message.reply("No results found.").then(m => m.delete(5000));
                    } else {
                        const tag = results.tags;
                                        
                        let s = '';
                        tag.forEach(v => s+=`${v.name}, `);
                        console.log(s);

                        const embed = new RichEmbed()
                            .setThumbnail(`https://t.nhentai.net/galleries/${results.media_id}/cover.jpg`)
                            .setTitle(`Title: ${results.title.pretty}`)
                            .addField('Tags:', `${s}`, true)
                            .addField('Details:', stripIndents`**ID:** *${results.id}*
                            **Pages:** *${results.num_pages}*
                            **Favorites:** *${results.num_favorites}*`)
                            .setColor(message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor);

                        message.channel.send(embed);
                    }
                })
            } else {
                let url = `https://nhentai.net/api/galleries/search?query=${search}`
                axios.get(url).then((response) => {
                    
                    const resultsSize = (response.data.result).length;
                    const results = response.data.result[Math.floor(Math.random() * resultsSize)];
                    if(!results){
                        return message.reply("No results found.").then(m => m.delete(5000));
                    } else {
                        const tag = results.tags;
                                        
                        let s = '';
                        tag.forEach(v => s+=`${v.name}\n`);
                        console.log(s);

                        const embed = new RichEmbed()
                            .setThumbnail(`https://t.nhentai.net/galleries/${results.media_id}/cover.jpg`)
                            .setTitle(`Title: ${results.title.pretty}`)
                            .addField('Tags:', `${s}`, true)
                            .addField('Details:', stripIndents`**ID:** *${results.id}*
                            **Pages:** *${results.num_pages}*
                            **Favorites:** *${results.num_favorites}*`)
                            .setColor(message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor);

                        message.channel.send(embed);
                    }
                })
            }
        }
    }
}
