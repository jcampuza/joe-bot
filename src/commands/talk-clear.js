const Discord = require('discord.js');
const { clearTalkingPoints, formatTalkingPoints } = require('../services/talk');

module.exports = {
  name: 'talk-clear',
  description: 'Clear all talking point',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   */
  execute(message, args) {
    clearTalkingPoints(message.guild.id);

    message.reply('Talking points cleared');
    message.channel.send(formatTalkingPoints(message.guild.id));
  },
};
