const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags"), fs = require("fs"), isReachable = require('is-reachable');
const osuAPIKey = "331d019695c3a3a72c67daba5a2502e56e6089ed";

module.exports = {
    name: "recentosu",
    aliases: ["rs"],
    category: "osu",
    usage: "[username/mention]",
    example: ".rs | .rs @Tanaka Shimarin",

    run: async(client, message, args) => {
        return message.react('😳');
        /*
        let user = "";
        let dataJSON = JSON.parse(fs.readFileSync('./json/userList.json'));
        const argsjoin = args.join(' ');
        let UID = (message.author.id);
        
        if (argsjoin == ""){
            if (dataJSON.osu.hasOwnProperty(UID)){
                user = dataJSON.osu[UID];
            } else {
                return message.reply("Please provide a username or set your osu account with `.setosu`").then(m => m.delete(5000));
            }
        } else if(message.mentions.id) {
            user = dataJSON.osu[message.mentions.id];
        } else {
            user = argsjoin;
        }
        
        let url = `https://osu.ppy.sh/api/v2/users/${user}/recent_activity&k=${osuAPIKey}&limit=1`;

        // if (await isReachable(url) == false)
        //     return message.reply("The Osu! API is currently down, please try again later...").then(m => m.delete(3000));
        
        axios.get(url).then(async (response) => { 
            // Check if user exists
            if(!response.data[0])
                return message.reply(`No user found with the name: \`${argsjoin}\``).then(m => m.delete(5000));

            console.log(response.data)
            /*
            // Get info about beatmap
            const beatMapID = response.data[0].beatmap_id;
            const uid = await axios.get(`https://osu.ppy.sh/api/get_user?u=${user}&k=${osuAPIKey}`);
            const wayaya = await axios.get(`https://osu.ppy.sh/api/get_beatmaps?k=${osuAPIKey}&b=${beatMapID}`);
            const beatmapsetID = wayaya.data[0].beatmapset_id;
            const beatmapName = wayaya.data[0].title;
            const songArtist = wayaya.data[0].artist;
                      
            console.log(playInfo)

            // Create and send Embed
            const embed = new RichEmbed()
                .setThumbnail(`https://b.ppy.sh/thumb/${beatmapsetID}l.jpg`)
                .setAuthor(`${beatmapName} by ${songArtist}`, `https://a.ppy.sh/${uid.data[0].user_id}?1.png`)
                .setDescription(stripIndents`• :regional_indicator_${(response.data[0].rank).toLowerCase()}: | **${Math.round((wayaya.difficultyrating)*100)/100}** ★ | 
                • `)
                .setURL(`https://osu.ppy.sh/beatmapsets/${beatMapID}`)
                .setColor("RANDOM")

            message.channel.send(embed);
            
        });
         */
       //return message.channel.send("This command is not complete...").then(m => m.delete(3000));
       
    }
}