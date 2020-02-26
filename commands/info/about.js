module.exports = {
    name: "about",
    category: "info",
    description: "Returns info about the bot. (unfinished)",
    
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Hello! I am NadeshikoBot, running Version ${process.env.VERSION}`);
        return;
    
    }
}