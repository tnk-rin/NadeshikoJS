// https://r34-json-api.herokuapp.com/posts?tags=${searchSus} URL

const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");
const fs = require("fs");
const Danbooru = require('danbooru');
const { promptMessage } = require("../../functions.js");
const booru = new Danbooru();

module.exports = {
    name: "danr",
    aliases: ["dr", "danbooru"],
    category: "nsfw",
    usage: "<search>",
    example: ".danr yuri | .danbooru rating:safe",

    run: async(client, message, args) => {
        const search = args.join(' ');
        
        let nsfwOnly = JSON.parse(fs.readFileSync('././serverSettings.json'));
        if (!message.channel.nsfw) {
            return message.reply("This command only works in channels marked NSFW...").then(m => m.delete(3000));
        }    
        
        if (!search){
            return message.reply("Please enter a search query.").then(m => m.delete(5000));
        } else {
            booru.posts({ tags: `${search}` }).then(posts => {
                const post = posts[Math.floor(Math.random()*posts.length)]
                if(!post){
                    return message.reply("No results found...").then(m => m.delete(5000));
                } else {
                    
                    const url = booru.url(post.file_url)
                    
                    console.log(url.href);
                    
                    const embed = new RichEmbed()
                        .setImage(url.href)
                        .setTitle("Link to image").setURL(`https://danbooru.donmai.us/posts/${post.id}`)

                    message.channel.send(embed)
                    /*
                    .then(async msg => {
                        const emoji = await promptMessage(msg, message.author, 30, ["⏮", "⏭"]);
            
                        if(emoji === "⏭"){
                            
                            message.reply("test right")
                                .then(m => m.delete(5000));
            
                        } else if(emoji === "⏮"){
                            
                            message.reply("test left")
                                .then(m => m.delete(5000));
                        }
                    });
                    */
                }
              })

            
                        
        }    
    }
}