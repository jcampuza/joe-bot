import path from 'path';
import { readJsonFile, writeJsonFile } from '../helpers';

export interface DB {
  [key: string]: {
    talkingPoints: string[];
  };
}

const dbPath = path.join(__dirname, '../..', 'store', 'db.json');

/**
 * Small wrapper around writing/reading to db json file
 */
export const createDbUtils = () => ({
  set: (db: DB) => writeJsonFile(dbPath, db),
  get: (): DB => readJsonFile(dbPath) as DB,
});
