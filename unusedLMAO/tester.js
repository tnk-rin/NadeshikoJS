const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags");
const fs = require("fs");
let nsfwOnly = JSON.parse(fs.readFileSync('././serverSettings.json'));
module.exports = {
    name: "tester",
    aliases: ["nhentai", "hentaisearch", "hentai"],
    category: "weeb",
    usage: "<search | g (tag)>",
    example: ".saucepls big boobs | .saucepls g 273405",

    run: async(client, message, args) => {
        console.log(message.channel.id)
        console.log(message.guild.id)
    }
}
