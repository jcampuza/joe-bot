import { DBService } from '../data/db';

export class TalkService {
  constructor(private dbService: DBService) {}

  getTalkingPoints(guildId: string) {
    const data = this.dbService.get();

    return data[guildId].talkingPoints;
  }

  setTalkingPoint(guildId: string, text = '') {
    const data = this.dbService.get();

    data[guildId].talkingPoints.push(text);

    this.dbService.set(data);
  }

  updateTalkingPoint(guildId: string, idx: number, text = '') {
    const data = this.dbService.get();

    data[guildId].talkingPoints = data[guildId].talkingPoints.map((item, i) => {
      if (i === idx - 1) {
        return text;
      }

      return item;
    });

    this.dbService.set(data);
  }

  deleteTalkingPoints(guildId: string, indexes: number[]) {
    const data = this.dbService.get();

    const originalLength = data[guildId].talkingPoints.length;

    const filteredTalkingPoints = data[guildId].talkingPoints.filter(
      (_, idx) => {
        return indexes.includes(idx + 1) ? false : true;
      }
    );

    data[guildId].talkingPoints = filteredTalkingPoints;

    this.dbService.set(data);

    return originalLength - filteredTalkingPoints.length;
  }

  clearTalkingPoints(guildId: string) {
    const data = this.dbService.get();

    data[guildId].talkingPoints = [];

    this.dbService.set(data);
  }

  formatTalkingPoints(guildId: string) {
    const talkingPoints = this.getTalkingPoints(guildId);

    if (!talkingPoints.length) {
      return 'No current talking points: Up to date 👍';
    }

    return [
      'Current talking points:',
      ...talkingPoints.map((point, idx) => `${idx + 1}: ${point}`),
    ].join('\n');
  }
}
