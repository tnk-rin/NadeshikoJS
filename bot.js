// stable token: NjIxMjQwNzAxMDQ4NTg2MjQw.XXy_2A.QqWwDjOdw9FtVwO95VVkKNVqV3w
// beta token: NjEyMTk2NDUwNDUzMDI4ODc0.XlSKVg.H_E31R8SSs7tCBTwhZCKgh1jCDA

const { Client, RichEmbed, Collection } = require('discord.js');
const { config } = require("dotenv");
const fs = require("fs");
const prefix = ".";

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["handler"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.on("ready", ()=> {
    console.log(`Rin Chan!! HiHi I am ${client.user.username}!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "Tanaka procrastinate on updating me.",
            type: "WATCHING"
        }
    });
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


config({
    path: `${__dirname}/.env`
})

client.login(process.env.TOKEN);

