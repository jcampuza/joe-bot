require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Disord = require('discord.js');
const { token, prefix } = require('./config');

const client = new Disord.Client();
const commands = new Disord.Collection();

const files = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter((file) => file.endsWith('.js'));

for (const file of files) {
  const command = require(path.join(__dirname, 'commands', file));
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
  const command = args.shift().toLowerCase();

  if (!commands.get(command)) {
    return;
  }

  try {
    commands.get(command).execute(message, args, commands);
  } catch (error) {
    console.error(error);
    message.reply(`There was an issue executing command: ${command}`);
  }
});

client.login(token);
