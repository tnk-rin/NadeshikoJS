const { RichEmbed } = require("discord.js");
const RandomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends a meme",
    run: async (client, message, args) => {
        const subreddits = ["animemes"];
        const random = subreddits[Math.floor(Math.random() * subreddits.length)];
        // const img = await RandomPuppy(random);

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage('https://upload.wikimedia.org/wikipedia/en/d/d0/Loss_comic.jpg')
            .setFooter(`/r/cum`)
            .setTitle("Link to subreddit")
            .setURL(`https://cum.com`);
        message.channel.send(embed);
    }
}