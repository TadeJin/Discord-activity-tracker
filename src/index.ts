import "dotenv/config";
import { Client, IntentsBitField, Interaction, Message } from 'discord.js';
import {readData} from './utils/dataManager';

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ],
});


client.on('clientReady', (c) => {
    console.log(`${c.user.tag} is online.`);
});


client.on('messageCreate', (message: Message) => {
    if (message.author.bot) {
        return;
    } else if (message.content === '.readData') {
        readData()
        message.reply('Read!');
    } else if (message.content === '.off') {
        message.reply('*OFF*');
        client.destroy();
    }
});

client.on('interactionCreate', (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName == 'hey') {
        interaction.reply('Hello!')
    }
});

client.login(process.env.BOT_TOKEN);
