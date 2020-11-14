import { createDbUtils } from '../data/db';

/**
 * talkService implements methods available for interfacing with talking points related data
 */
export const createTalkService = (dbService = createDbUtils()) => {
  const getTalkingPoints = (guildId: string) => {
    const data = dbService.get();

    if (!data[guildId]) {
      data[guildId] = {
        talkingPoints: [],
      };
    }

    return data[guildId].talkingPoints;
  };

  const setTalkingPoint = (guildId: string, text = '') => {
    const data = dbService.get();

    if (!data[guildId]) {
      data[guildId] = {
        talkingPoints: [],
      };
    }

    data[guildId].talkingPoints.push(text);

    dbService.set(data);
  };

  const updateTalkingPoint = (guildId: string, idx: number, text = '') => {
    const data = dbService.get();

    if (!data[guildId]) {
      return null;
    }

    data[guildId].talkingPoints = data[guildId].talkingPoints.map((item, i) => {
      if (i === idx - 1) {
        return text;
      }

      return item;
    });

    dbService.set(data);
  };

  const deleteTalkingPoints = (guildId: string, indexes: number[]) => {
    const data = dbService.get();

    if (!data[guildId]) {
      data[guildId] = {
        talkingPoints: [],
      };
    }

    const originalLength = data[guildId].talkingPoints.length;

    const filteredTalkingPoints = data[guildId].talkingPoints.filter(
      (_, idx) => {
        return indexes.includes(idx + 1) ? false : true;
      }
    );

    data[guildId].talkingPoints = filteredTalkingPoints;

    dbService.set(data);

    return originalLength - filteredTalkingPoints.length;
  };

  const clearTalkingPoints = (guildId: string) => {
    const data = dbService.get();

    if (!data[guildId]) {
      return;
    }

    data[guildId].talkingPoints = [];

    dbService.set(data);
  };

  const formatTalkingPoints = (guildId: string) => {
    const talkingPoints = getTalkingPoints(guildId);

    if (!talkingPoints.length) {
      return 'No current talking points: Up to date 👍';
    }

    return [
      'Current talking points:',
      ...talkingPoints.map((point, idx) => `${idx + 1}: ${point}`),
    ].join('\n');
  };

  return {
    formatTalkingPoints,
    clearTalkingPoints,
    getTalkingPoints,
    setTalkingPoint,
    updateTalkingPoint,
    deleteTalkingPoints,
  };
};
