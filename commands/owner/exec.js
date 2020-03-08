const execSync = require('child_process').execSync;
const { RichEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "exec",
    aliases: ["cmd, e"],
    category: "owner",
    usage: "<shell command>",

    run: async (client, message, args) => {
        if(!message.author.id === process.env.OWNER_ID)
            return message.reply("This is an owner only command...").then(m => m.delete(5000));

        const temp_arr = args.slice(1);

        const command = temp_arr.join(' ');
        let output = "";
        // console.log(command);
        fs.writeFileSync('./exec_cache/code.ntr', command);

        if (args[0] == "JS") {
            output = execSync('node exec_cache/code.ntr', { encoding: 'utf-8' });
        } else if (args[0] == "PY") {
            output = execSync('python exec_cache/code.ntr', { encoding: 'utf-8' });
        } else {
            output = execSync(args.join(' '), { encoding: 'utf-8'});
        }

        if (output.length > 1024) {
            output = output.substring(0, 1022)
        }

        const embed = new RichEmbed()
            .setTitle(`${args[0]}`)
            .setColor("RANDOM")
            .addField("Shell output:", output)
            .setTimestamp(message.createdAt);


        message.channel.send(embed);

        console.log(output);
    }
}