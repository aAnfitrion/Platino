import {
  Client,
  CommandInteraction,
  GatewayIntentBits,
  EmbedBuilder,
} from "discord.js";
import axios from "axios";


import teclaIp from "./comandos/teclaIp";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

require("dotenv").config();
const { TOKEN } = process.env;

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(TOKEN);

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  teclaIp(message);
});
