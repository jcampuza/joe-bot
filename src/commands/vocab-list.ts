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

    return message.reply(reply);
  },
});
