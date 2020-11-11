import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'store', 'db.json');

export interface DB {
  [key: string]: {
    talkingPoints: string[];
  };
}

const readFile = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch {
    console.log('Error reading file', path);

    return {};
  }
};

export const writeDb = (db: DB) => {
  const formatted = JSON.stringify(db, undefined, '\t');

  fs.writeFileSync(dbPath, formatted);
};

export const fetchDb = (): DB => {
  const db = readFile(dbPath) as DB;

  return db;
};
