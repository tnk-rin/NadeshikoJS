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
    console.log(`i-is this thing on? yes? good! I am ${client.user.username}`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "Kotori",
            type: "LISTENING"
        }
    });
});

client.on("message", async message => {
    const prefix = ".";

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)){ return; } else {}
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

