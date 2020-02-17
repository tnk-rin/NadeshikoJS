module.exports = {
    name: "lovecalc",
    aliases: ["ship", "marry"],
    category: "fun",
    usage: "<mention>",
    example: ".ship @Tanaka Shimarin",

    run: async(client, message, args) => {
        let authID = (message.author.id)*1.7;
        let mentionID = message.mentions.users.first().id;
        console.log(message.author.id);
        console.log(message.mentions.users.first().id)
        console.log(Math.floor((authID/mentionID)*10))
        message.channel.send(`You have a ${Math.floor((authID/mentionID)*10)}% match.`);

    }
}