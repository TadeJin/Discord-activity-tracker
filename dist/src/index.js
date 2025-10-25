"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const dataManager_1 = require("./utils/dataManager");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent,
        discord_js_1.IntentsBitField.Flags.GuildVoiceStates
    ],
});
client.on('clientReady', (c) => {
    console.log(`${c.user.tag} is online.`);
});
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    else if (message.content === '.readData') {
        (0, dataManager_1.readData)();
        message.reply('Read!');
    }
    else if (message.content === '.off') {
        message.reply('*Dostal teleskopem na koleno*');
        client.destroy();
    }
});
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName == 'hey') {
        interaction.reply('Hello!');
    }
});
client.login(process.env.BOT_TOKEN);
