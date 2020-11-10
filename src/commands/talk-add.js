const Discord = require('discord.js');
const { setTalkingPoint, formatTalkingPoints } = require('../services/talk');

module.exports = {
  name: 'talk-add',
  description: 'Add a talking point',
  /**
   *
   * @param {Discord.Message} message
   * @param {any[]} args
   */
  execute(message, args) {
    if (!args.length) {
      message.reply('No talking point was set');
    }

    setTalkingPoint(message.guild.id, args.join(' '));

    message.reply('Talking point added!');
    message.channel.send(formatTalkingPoints(message.guild.id));
  },
};
