const { fetchDb, writeDb } = require('../helpers');

const getTalkingPoints = (guildId) => {
  const db = fetchDb();

  if (!db[guildId]) {
    db[guildId] = {
      talkingPoints: [],
    };
  }

  return db[guildId].talkingPoints;
};

const setTalkingPoint = (guildId, text = '') => {
  const db = fetchDb();

  if (!db[guildId]) {
    db[guildId] = {
      talkingPoints: [],
    };
  }

  db[guildId].talkingPoints.push(text);

  writeDb(db);
};

const deleteTalkingPoint = (guildId, idx) => {
  const db = fetchDb();

  if (!db[guildId]) {
    db[guildId] = {
      talkingPoints: [],
    };
  }

  db[guildId].talkingPoints.splice(idx - 1, 1);

  writeDb(db);
};

const clearTalkingPoints = (guildId) => {
  const db = fetchDb();

  if (!db[guildId]) {
    return;
  }

  db[guildId].talkingPoints = [];

  writeDb(db);
};

const formatTalkingPoints = (guildId) => {
  const talkingPoints = getTalkingPoints(guildId);

  if (!talkingPoints.length) {
    return 'No current talking points: Up to date 👍';
  }

  return [
    'Current talking points:',
    ...talkingPoints.map((point, idx) => `${idx + 1}: ${point}`),
  ].join('\n');
};

module.exports = {
  getTalkingPoints,
  setTalkingPoint,
  deleteTalkingPoint,
  clearTalkingPoints,
  formatTalkingPoints,
};
