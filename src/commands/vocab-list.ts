import { Buffer } from 'buffer';
import { MessageAttachment } from 'discord.js';
import { createCommand } from '../command';

export default createCommand({
  name: 'vocab-list',

  description: 'Lists all vocab encountered thus far',

  execute(message, args, { languageService, guildId }) {
    const phrases = languageService.getPhrases(guildId);

    const reply = [
      'Current phrases:',
      ...phrases.map(
        (point, idx) => `${idx + 1}: ${point.phrase} - hits: ${point.hits}`
      ),
    ].join('\n');

    const buffer = Buffer.from(reply);
    const attachment = new MessageAttachment(buffer, 'vocab.txt');

    return message.reply("Here's the current vocab!", attachment);
  },
});
