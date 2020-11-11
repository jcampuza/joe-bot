const Discord = require('discord.js');

module.exports = {
  name: 'talk-help',
  description: 'List talking points related commands',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   * @param {Discord.Collection} commands
   */
  execute(message, args, commands) {
    const talkCommands = commands.filter((value, key) => value.name.startsWith('talk'));
    const formatted = talkCommands.map((command) => `${command.name}: ${command.description}`);

    const response = ['Talking points related commands:', ...formatted].join('\n');

    message.reply(response);
  },
};
