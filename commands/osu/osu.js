const { RichEmbed } = require("discord.js"), axios = require("axios"), { stripIndents } = require("common-tags"), fs = require("fs"), isReachable = require('is-reachable');
const osuAPIKey = "331d019695c3a3a72c67daba5a2502e56e6089ed";

module.exports = {
    name: "osu",
    aliases: ["osuprofile"],
    category: "osu",
    usage: "[mention]",
    example: ".osu | .osu @Tanaka Shimarin",

    run: async(client, message, args) => {
        return message.react('😳');
        /*
        let user = "";
        let dataJSON = JSON.parse(fs.readFileSync('./json/userList.json'));
        const argsjoin = args.join(' ');
        let UID = (message.author.id);
        // console.log(UID);

        if (argsjoin == ""){
            // console.log("bruhc")
            if (dataJSON.osu.hasOwnProperty(UID)){
                // console.log("bruhchiko")
                user = dataJSON.osu[UID];
            } else {
                return message.reply("Please provide a username or set your osu account with `.setosu`").then(m => m.delete(5000));
            }
        } else {
            user = args[0]
        }
        
        let url = `https://osu.ppy.sh/api/get_user?u=${user}&k=${osuAPIKey}`;

        if (await isReachable(url) == false)
            return message.reply("The Osu! API is currently down, please try again later...").then(m => m.delete(3000));
        
        axios.get(url).then((response) => { 
            if(!response.data[0])
                return message.reply(`No user found with the name: \`${argsjoin}\``).then(m => m.delete(5000));

            const results = response.data[0];
            const region = (results.country).toLowerCase();
            const uid = results.user_id;
            const usrImg = `https://a.ppy.sh/${uid}?1.png`;
            const lvl = Math.floor(results.level);
            const nxtLvl = (Math.round((results.level - lvl)*10000))/100;
            const acc = Math.round((results.accuracy)*100)/100
            const timeFormatted = secondsToDhms(results.total_seconds_played);
            // console.log(results);
            const embed = new RichEmbed()
                .setTitle(`osu! profile for ${results.username}`)
                .setColor("#bd3783")
                .setDescription(stripIndents`• **Global Rank:** #${results.pp_rank}
                • **Country Rank:** ${region.toUpperCase()}#${results.pp_country_rank}
                • **Level:** ${lvl} (${nxtLvl}%)
                • **Total PP:** ${results.pp_raw}pp
                • **Accuracy:** ${acc}%
                • **Time Played:** ${timeFormatted}`)
                .setFooter(`Joined osu! on ${results.join_date}`)
                .setThumbnail(usrImg)

            message.channel.send(embed);
        });
        */
       //return message.channel.send("This command is not complete...").then(m => m.delete(3000));
    }
    

}

function secondsToDhms(seconds){

    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
        
    let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
    

}