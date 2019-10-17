const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "saucepls",
    aliases: ["nhentai", "hentaisearch", "hentai"],
    category: "hentai",
    usage: "[search]",

    run: async(client, message, args) => {
        const search = args.join(' ');
        
        if (!search){
            return message.reply("Please enter a search query.").then(m => m.delete(5000));
        } else {
            let url = `https://nhentai.net/api/galleries/search?query=${search}`
            axios
        }

    }
}
