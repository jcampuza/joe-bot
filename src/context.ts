import { Collection } from 'discord.js';
import { Command } from './command';
import { createDbUtils } from './data/db';
import { createTalkService } from './services/talk';

/**
 * Creats context that is available for commands to use per request
 */
export const createContext = (commands: Collection<string, Command>) => {
  const db = createDbUtils();
  const talkService = createTalkService(db);

  return {
    commands,
    talkService,
    db,
  };
};

export type Context = ReturnType<typeof createContext>;
