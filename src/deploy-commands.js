require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: 'hey',
        description: 'Simple command',
    },
];

const botID = process.env.BOT_ID;
const serverID = process.env.SERVER_ID;
const botToken = process.env.BOT_TOKEN;

const rest = new REST({ version: 10 }).setToken(botToken);

const commandsRegister = async () => {
    try {
        console.log("Registering commands");
        await rest.put(Routes.applicationGuildCommands(botID, serverID), {
            body: commands 
        });

        console.log("Commands loaded");
    } catch (error) {
        console.error(error);
    }
};

commandsRegister();

