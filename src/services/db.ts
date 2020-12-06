import path from 'path';
import { readJsonFile, writeJsonFile } from '../lib/helpers';

export interface Vocab {
  phrase: string;
  definition: string;
  hits: number;
}

export interface DBGuild {
  id: string;
  talkingPoints: string[];
  language: {
    enabled: boolean;
    vocab: Record<string, Vocab>;
  };
}

export interface DB {
  [key: string]: DBGuild;
}

const dbPath = path.join(__dirname, '../..', 'store', 'db.json');

/**
 * Small wrapper around writing/reading to db json file
 */
export class DBService {
  set(db: DB) {
    return writeJsonFile(dbPath, db);
  }

  get(): DB {
    return readJsonFile(dbPath) as DB;
  }
}
