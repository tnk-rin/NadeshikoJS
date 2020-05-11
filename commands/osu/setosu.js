const { RichEmbed } = require("discord.js"), fs = require("fs"), axios = require("axios"), isReachable = require("is-reachable");
const osuAPIKey = "331d019695c3a3a72c67daba5a2502e56e6089ed";
// https://osu.ppy.sh/oauth/authorize?client_id=1007&redirect_uri=https://tanakashimarin.github.io&response_type=code

module.exports = {
    name: "setosu",
    aliases: ["setosuprofile"],
    category: "osu",
    usage: "<osu username>",
    example: ".setosu Tanaka_Rin",
    run: async(client, message, args) => {
        /*
        let dataJSON = JSON.parse(fs.readFileSync('./json/userList.json'));
        let argsjoin = args.join(' ')
        let url = `https://osu.ppy.sh/api/get_user?u=${argsjoin}&k=${osuAPIKey}`;
        let UID = (message.author.id);

        if (await isReachable(url) == false)
            return message.reply("The Osu! API is currently down, please try again later...").then(m => m.delete(3000));

        axios.get(url).then((response) => {
            if(!response.data[0])
                return message.reply(`No user found with the name: \`${argsjoin}\``).then(m => m.delete(5000));

            if(dataJSON.osu.hasOwnProperty(UID))
                return message.reply("You have already set your osu! account, please use `.osureset` to remove it...").then(m => m.delete(5000));

            dataJSON.osu[UID] = argsjoin;
            let strData = JSON.stringify(dataJSON)
            message.react('✅');
            fs.writeFileSync('./json/userList.json', strData);

        });
        */
       
        return message.channel.send("This command is not complete...").then(m => m.delete(3000));
    }
}