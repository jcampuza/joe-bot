import { fetchDb, writeDb } from '../helpers';

export const getTalkingPoints = (guildId: string) => {
  const db = fetchDb();

  if (!db[guildId]) {
    db[guildId] = {
      talkingPoints: [],
    };
  }

  return db[guildId].talkingPoints;
};

export const setTalkingPoint = (guildId: string, text = '') => {
  const db = fetchDb();

  if (!db[guildId]) {
    db[guildId] = {
      talkingPoints: [],
    };
  }

  db[guildId].talkingPoints.push(text);

  writeDb(db);
};

export const updateTalkingPoint = (guildId: string, idx: number, text = '') => {
  const db = fetchDb();

  if (!db[guildId]) {
    return null;
  }

  db[guildId].talkingPoints = db[guildId].talkingPoints.map((item, i) => {
    if (i === idx - 1) {
      return text;
    }

    return item;
  });

  writeDb(db);
};

export const deleteTalkingPoint = (guildId: string, idx: number) => {
  const db = fetchDb();

  if (!db[guildId]) {
    db[guildId] = {
      talkingPoints: [],
    };
  }

  db[guildId].talkingPoints.splice(idx - 1, 1);

  writeDb(db);
};

export const clearTalkingPoints = (guildId: string) => {
  const db = fetchDb();

  if (!db[guildId]) {
    return;
  }

  db[guildId].talkingPoints = [];

  writeDb(db);
};

export const formatTalkingPoints = (guildId: string) => {
  const talkingPoints = getTalkingPoints(guildId);

  if (!talkingPoints.length) {
    return 'No current talking points: Up to date 👍';
  }

  return [
    'Current talking points:',
    ...talkingPoints.map((point, idx) => `${idx + 1}: ${point}`),
  ].join('\n');
};
