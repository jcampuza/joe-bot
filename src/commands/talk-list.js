const Discord = require('discord.js');
const { formatTalkingPoints } = require('../services/talk');

module.exports = {
  name: 'talk-list',
  description: 'List all talking points',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   */
  execute(message, args) {
    message.reply(formatTalkingPoints(message.guild.id));
  },
};
