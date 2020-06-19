const { RichEmbed } = require("discord.js"), fs = require("fs"), crypto = require("crypto");
const { promptMessage, getMember } = require("../../functions.js");
let userList = JSON.parse(fs.readFileSync("./json/userList.json"));

module.exports = {
    name: "warn",
    category: "moderation",
    usage: "<id | mention>",
    description: "Warns the member.",
    run: async(client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        const GID = (message.guild.id);
        const toWarn = getMember(message, args.join(' ')).id;
        var reason;
        
        if(message.deletable) message.delete;

        //no mention
        if(!args[0]){
            return message.reply("Please mention a user to warn or provide an id.")
                .then(m => m.delete(5000));
        }

        //no reason
        if(!args[1]){
            reason = "No reason given.";
        } else {
            reason = args.slice(1).join(" ");
        }

        //no user permissions
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.reply("You do not have the permissions to warn members. Please contact a staff member.")
                .then(m => m.delete(5000));
        }
                
        //no member found
        if(!toWarn){
            return message.reply("Couldn't find that member, try again!")
                .then(m => m.delete(5000));
        }

        // console.log(toWarn)

        //runs if all checks pass
        let warns = 0;

        //see if user exists in json
        if (Object.keys(userList[toWarn]).length == 0){
            userList[toWarn] = {warns:{}};
            userList[toWarn].warns[GID] = {};
        }

        //check if user already has warns if so add to that, if not start from scratch
        const checker = userList[toWarn].warns;
        if(GID in checker){
            // console.log(toString(message.createdTimestamp + parseInt(message.guild.id)))
            let toHash = parseInt(crypto.createHash('md5').update(`id${message.createdAt}`).digest("hex"), 16) / 10e21;
            warns = Object.keys(userList[toWarn].warns[GID]).length;
            userList[toWarn].warns[GID][warns + 1] = {
                reason: reason,
                mod: message.member.id,
                timestamp: message.createdTimestamp,
                id: toHash
            };
        } else {
            console.log("uhoh")
        }
        let strData = JSON.stringify(userList)
        message.react('✅');
        fs.writeFileSync('./json/userList.json', strData);
        fs.close();
    }
}