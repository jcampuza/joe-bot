import { DBService, Vocab } from './db';
import { GuildService } from './guild';

export const createLanguageService = (
  dbService: DBService,
  guildService: GuildService
) => {
  const getEnabled = (guildId: string) => {
    const guild = guildService.getGuild(guildId);

    return guild.language.enabled;
  };

  const toggleLanguageService = (guildId: string, value: boolean) => {
    const guild = guildService.getGuild(guildId);
    guild.language.enabled = value;
    guildService.setGuild(guild);
  };

  const addVocab = (guildId: string, phrase: string, definition: string) => {
    const guild = guildService.getGuild(guildId);

    if (guild.language.vocab[phrase]) {
      guild.language.vocab[phrase] = {
        ...guild.language.vocab[phrase],
        phrase,
        definition,
      };
    } else {
      guild.language.vocab[phrase] = {
        phrase,
        definition,
        hits: 0,
      };
    }

    guildService.setGuild(guild);
  };

  const getPhrases = (guildId: string) => {
    const guild = guildService.getGuild(guildId);

    const phrases = Object.values(guild.language.vocab);

    return phrases;
  };

  const updateHits = (guildId: string, phrase: Vocab) => {
    const guild = guildService.getGuild(guildId);
    const vocab = guild.language.vocab[phrase.phrase];

    guild.language.vocab[phrase.phrase] = { ...vocab, hits: vocab.hits + 1 };

    guildService.setGuild(guild);
  };

  return {
    getEnabled,
    toggleLanguageService,
    addVocab,
    getPhrases,
    updateHits,
  };
};

export type LanguageService = ReturnType<typeof createLanguageService>;
