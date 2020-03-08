const { RichEmbed } = require("discord.js");
const RandomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends a meme",
    run: async (client, message, args) => {
        const subreddits = ["animemes", "anime_irl"];
        const random = subreddits[Math.floor(Math.random() * subreddits.length)];
        const img = await RandomPuppy(random);

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setFooter(`/r/${random}`)
            .setTitle("Link to subreddit")
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);

    }
}