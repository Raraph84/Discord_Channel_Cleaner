const { Client } = require("discord.js");
const Config = require("./config.json");

const client = new Client({ intents: [] });
client.login(Config.token);

client.on("ready", async () => {

    /** @type {import("discord.js").TextChannel} */
    const channel = await client.channels.fetch(Config.channelId);

    console.log(`Cleaning ${channel.name} !`);

    let deletedMessages = 0;

    const fetch = async (id = null) => {

        const messages = await channel.messages.fetch({ before: id, limit: 100 });

        if (messages.size < 1)
            return;

        for (const message of messages.values()) {
            await message.delete();
            deletedMessages++;
        }

        await fetch(messages.last().id);
    }

    await fetch();

    client.destroy();
    console.log(`Cleaned ${channel.name} (${deletedMessages} messages) !`);
});
