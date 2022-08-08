import { createListener } from '../lib/listener';
import { logger } from '../lib/logger';

export default createListener({
  name: 'vocab-phrase',
  description: 'Listens for hits on a word that is in vocab',

  enabled(_, { appContext: { languageService }, guildId }) {
    return languageService.getEnabled(guildId);
  },

  execute(message, { appContext: { languageService }, guildId }) {
    const content = message.content;
    const phrases = languageService.getPhrases(guildId);

    for (const phrase of phrases) {
      if (content.includes(phrase.phrase)) {
        logger.log(`Phrase hit: ${phrase.phrase}`);
        languageService.updateHits(guildId, phrase);
      }
    }
  },
});
