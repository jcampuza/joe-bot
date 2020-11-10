const Discord = require('discord.js');
const { getTalkingPoints, formatTalkingPoints, deleteTalkingPoint } = require('../services/talk');

module.exports = {
  name: 'talk-delete',
  description: 'Delete a talking point by its ID',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   */
  execute(message, args) {
    const id = parseInt(args[0]);

    if (!args[0] || isNaN(id)) {
      return message.reply('A valid talking point id is required');
    }

    deleteTalkingPoint(message.guild.id, id);

    message.reply('Talking point deleted');
    message.channel.send(formatTalkingPoints(message.guild.id));
  },
};
