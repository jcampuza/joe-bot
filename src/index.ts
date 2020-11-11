require('dotenv').config();
import Disord from 'discord.js';
import { Command } from './command';
import Commands from './commands';
import config from './config';

const { prefix, token } = config;

const client = new Disord.Client();
const commands = new Disord.Collection<string, Command>();

for (const command of Object.values(Commands)) {
  commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Joe Bot successfully connected and ready');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (!command || !commands.get(command)) {
    return;
  }

  try {
    commands.get(command)!.execute(message, args, commands);
  } catch (error) {
    console.error(error);
    message.reply(`There was an issue executing command: ${command}`);
  }
});

client.login(token);
