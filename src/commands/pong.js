const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Ping!',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   */
  execute(message, args) {
    message.reply('Pong');
  },
};
