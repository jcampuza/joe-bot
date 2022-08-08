import path from 'path';
import { ROOT } from '../paths';
import { readJsonFile, writeJsonFile } from '../bot/lib/helpers';
import config from '../config/config';

export interface Vocab {
  phrase: string;
  definition: string;
  hits: number;
}

export interface Reminder {
  id: string;
  guildId: string;
  user: string;
  userId: string;
  message: string;
  time: string;
}

export interface DBGuild {
  id: string;
  talkingPoints: string[];
  language: {
    enabled: boolean;
    vocab: Record<string, Vocab>;
  };
  reminders: Reminder[];
}

export interface DB {
  [key: string]: DBGuild;
}

const dbPath = path.join(ROOT, config.dbJsonUrl);

/**
 * Small wrapper around writing/reading to db json file
 */
export const createDbService = () => {
  return {
    set(db: DB) {
      return writeJsonFile(dbPath, db);
    },

    get(): DB {
      return readJsonFile(dbPath) as DB;
    },
  };
};

export type DBService = ReturnType<typeof createDbService>;
