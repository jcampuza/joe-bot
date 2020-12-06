import { createListener } from '../lib/listener';
import { logger } from '../lib/logger';

const shouldExecute = (content: string) => {
  return content.includes('=');
};

const parseMessage = (content: string) => {
  const [vocab, definition] = content.split('=');

  return {
    vocab: vocab.trim(),
    definition: definition.trim(),
  };
};

export default createListener({
  name: 'vocab-phrase',
  description: 'Listens for hits on a word that is in vocab',

  enabled(_, { languageService, guildId }) {
    return languageService.getEnabled(guildId);
  },

  execute(message, { guildId, languageService }) {
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
