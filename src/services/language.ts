import { DBService } from '../data/db';
import { GuildService } from './guild';

export class LanguageService {
  constructor(
    private dbService: DBService,
    private guildService: GuildService
  ) {}

  getEnabled(guildId: string) {
    const guild = this.guildService.getGuild(guildId);

    return guild.language.enabled;
  }

  toggleLanguageService(guildId: string, value: boolean) {
    const guild = this.guildService.getGuild(guildId);
    guild.language.enabled = value;
    this.guildService.setGuild(guild);
  }

  addVocab(guildId: string, phrase: string, definition: string) {
    const guild = this.guildService.getGuild(guildId);

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

    this.guildService.setGuild(guild);
  }

  getPhrases(guildId: string) {
    const guild = this.guildService.getGuild(guildId);

    const phrases = Object.values(guild.language.vocab);

    return phrases;
  }

  updateHits(guildId: string, phrase: string) {
    const guild = this.guildService.getGuild(guildId);
    const vocab = guild.language.vocab[phrase];

    guild.language.vocab[phrase] = { ...vocab, hits: vocab.hits + 1 };

    this.guildService.setGuild(guild);
  }
}
