import { DBService } from './db';

export const createTalkService = (dbService: DBService) => {
  const getTalkingPoints = (guildId: string) => {
    const data = dbService.get();

    return data[guildId].talkingPoints;
  };

  const setTalkingPoint = (guildId: string, text = '') => {
    const data = dbService.get();

    data[guildId].talkingPoints.push(text);

    dbService.set(data);
  };

  const updateTalkingPoint = (guildId: string, idx: number, text = '') => {
    const data = dbService.get();

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
    getTalkingPoints,
    setTalkingPoint,
    updateTalkingPoint,
    deleteTalkingPoints,
    clearTalkingPoints,
    formatTalkingPoints,
  };
};

export type TalkService = ReturnType<typeof createTalkService>;
