const Discord = require("discord.js");
const Config = require("./config.json");

const client = new Discord.Client({ intents: [] });
client.login(Config.token);

client.on("ready", async () => {

    /** @type {Discord.TextChannel} */
    const channel = await client.channels.fetch(Config.channelId);

    console.log(`Cleaning ${channel.name} !`);

    let deletedMessages = 0;

    const fetch = async (id = null) => {

        const messages = await channel.messages.fetch({ after: id });

        if (messages.size < 1)
            return;

        for (const message of messages.values()) {
            await message.delete();
            deletedMessages++;
        }

        await fetch(messages.last().id);
        return;
    }

    await fetch();

    console.log(`Cleaned ${channel.name} (${deletedMessages} messages) !`);
    process.exit(0);
});