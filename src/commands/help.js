const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Help command',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   * @param {Discord.Collection[]} args
   */
  execute(message, args, commands) {
    const formatted = commands.map((command) => `jb-${command.name}: ${command.description}`);

    const response = ['All commands description points related commands:', ...formatted].join('\n');

    return message.reply(response);
  },
};
