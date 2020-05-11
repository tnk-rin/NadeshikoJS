// stable token: NjIxMjQwNzAxMDQ4NTg2MjQw.XXy_2A.QqWwDjOdw9FtVwO95VVkKNVqV3w
// beta token: NjEyMTk2NDUwNDUzMDI4ODc0.XlSKVg.H_E31R8SSs7tCBTwhZCKgh1jCDA

const { Client, RichEmbed, Collection } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require('./erelaJ.json')
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["handler"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.on("ready", () => {

    console.log(`Rin Chan!! HiHi I am ${client.user.username}!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "Tanaka develop new commands",
            type: "WATCHING"
        }
    });

    client.music = new ErelaClient(client, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", player => {
            player.textChannel.send("Queue has ended.")
            return client.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete(15000)));

    client.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);                     

});

client.on("message", async message => {
    const prefix = process.env.PREFIX;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)){ return; }
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command)
        command.run(client, message, args);
});

client.on("disconnect", (client, event) => {
    setTimeout(() => client.destroy().then(() => client.login(process.env.TOKEN)), 10000);
    console.log(`[DISCONNECT] Notice: Disconnected from gateway with code ${event.code} - Attempting reconnect.`);
});

client.on("error", e => {
    console.log(e);
});

config({
    path: `${__dirname}/.env`
})

client.login(process.env.TOKEN);

