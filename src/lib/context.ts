import { Collection, Message } from 'discord.js';
import { Command } from './command';
import { DBService } from '../services/db';
import { GuildService } from '../services/guild';
import { LanguageService } from '../services/language';
import { TalkService } from '../services/talk';

/**
 * Creats context that is available for commands to use per request
 */
export const createContext = (
  commands: Collection<string, Command>,
  message: Message
) => {
  const guildId = message.guild!.id;
  const dbService = new DBService();
  const guildService = new GuildService(dbService);
  const talkService = new TalkService(dbService);
  const languageService = new LanguageService(dbService, guildService);

  return {
    guildId,
    commands,
    guildService,
    talkService,
    languageService,
    dbService,
  };
};

export type Context = ReturnType<typeof createContext>;
