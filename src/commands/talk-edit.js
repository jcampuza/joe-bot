const Discord = require('discord.js');
const { formatTalkingPoints, updateTalkingPoint, getTalkingPoints } = require('../services/talk');

module.exports = {
  name: 'talk-edit',
  description: 'Delete a talking point by its ID',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   */
  execute(message, args) {
    const [rawId, ...text] = args;
    const id = parseInt(rawId);

    const talkingPoints = getTalkingPoints(message.guild.id);

    if (!id || isNaN(id) || !talkingPoints[id - 1]) {
      return message.reply('A valid talking point id is required');
    }

    if (!text.length) {
      return message.reply('No edits found');
    }

    updateTalkingPoint(message.guild.id, id, text.join(' '));

    message.reply('Talking point Updated');
    message.channel.send(formatTalkingPoints(message.guild.id));
  },
};
