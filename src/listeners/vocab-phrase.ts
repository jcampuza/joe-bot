import { createListener } from '../listener';

const splitLines = (content: string) => content.split('\n');

const shouldExecute = (content: string) => {
  return content.includes('=');
};

const parseMessage = (content: string) => {
  const [vocab, definition] = content.split('=');

  return {
    vocab: vocab?.trim() ?? '',
    definition: definition?.trim() ?? '',
  };
};

export default createListener({
  name: 'vocab-phrase',
  description:
    'Listens for commands containing a vocab snippet and stores it for later use',
  enabled(_, { languageService, guildId }) {
    return languageService.getEnabled(guildId);
  },

  execute(message, { guildId, languageService }) {
    const content = message.content;

    if (!shouldExecute(content)) {
      return;
    }

    for (const line of splitLines(content)) {
      const { vocab, definition } = parseMessage(line);

      if (vocab && definition) {
        languageService.addVocab(guildId, vocab, definition);
      }
    }
  },
});
