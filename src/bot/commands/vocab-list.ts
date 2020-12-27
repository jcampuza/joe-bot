import { Buffer } from 'buffer';
import { MessageAttachment } from 'discord.js';
import { LanguageService } from '../../data/language';
import { createCommand } from '../lib/command';

const columns = ['Phrase', 'Definition', 'Hits'];

export default createCommand({
  name: 'vocab-list',

  description: 'Lists all vocab encountered thus far',

  async execute(message, args, context) {
    const guildId = context.guildId;
    const languageService = context.get(LanguageService);

    const phrases = languageService.getPhrases(guildId);

    // Generate CSV
    const reply = [
      columns.join(','),
      ...phrases.map((phrase) =>
        [phrase.phrase, phrase.definition, phrase.hits].join(',')
      ),
    ].join('\n');

    const buffer = Buffer.from(reply);
    const attachment = new MessageAttachment(buffer, 'vocab.csv');

    await message.reply("Here's the current vocab!", attachment);
  },
});
