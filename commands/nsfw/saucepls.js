const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");
const fs = require("fs");
const isReachable = require('is-reachable');

module.exports = {
    name: "saucepls",
    aliases: ["nhentai", "hentaisearch", "hentai", "doujin"],
    category: "nsfw",
    usage: "<search | g (tag)>",
    example: ".saucepls big boobs | .saucepls g 273405",

    run: async(client, message, args) => {
        const search = args.join(' ');
        if (!message.channel.nsfw)
            return message.reply("This command only works in channels marked NSFW...").then(m => m.delete(3000));
        
        if (isReachable('https://nhentai.net') == false)
            return message.reply("nHentai servers are currently down, please try again later...").then(m => m.delete(3000));
        if (!search){
            return message.reply("Please enter a search query.").then(m => m.delete(5000));

        } else {
            let url = ``;
            if(args[0] === 'g'){
                url = `https://nhentai.net/api/gallery/${args[1]}`;
            } else {
                url = `https://nhentai.net/api/galleries/search?query=${search}`;
            }
            
            axios.get(url).then((response) => {    
                let results = ``;            
                if(args[0] != 'g'){
                    const resultsSize = (response.data.result).length;
                    results = response.data.result[Math.floor(Math.random() * resultsSize)];
                } else {
                    results = response.data;
                }
                if(!results){
                    return message.reply("No results found.").then(m => m.delete(5000));
                } else {
                    const tag = results.tags;    
                    let s = '';
                    tag.forEach(v => s+=`\`${v.name}\` `);
                    // console.log(s);

                    const embed = new RichEmbed()
                        .setThumbnail(`https://t.nhentai.net/galleries/${results.media_id}/cover.jpg`)
                        .setTitle(`Title: ${results.title.pretty}`)
                        .setURL(`https://nhentai.net/g/${results.id}`)
                        .addField('Tags:', `${s}`, true)
                        .setColor(message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor);

                    if(args[0] != 'g'){
                        embed.addField('Details:', stripIndents`**ID:** *${results.id}*
                        **Pages:** *${results.num_pages}*
                        **Favorites:** *${results.num_favorites}*`)
                    } else {
                        embed.addField('Details:', stripIndents`**Pages:** *${results.num_pages}*
                        **Favorites:** *${results.num_favorites}*`)
                    }

                    message.channel.send(embed);
                }
            })            
        }
    }
}
