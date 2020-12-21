import { DBGuild, DBService } from './db';

const updateGuild = (guildId: string, guild: Partial<DBGuild>): DBGuild => {
  const copy = { id: guildId, ...guild };

  if (!copy.talkingPoints) {
    copy.talkingPoints = [];
  }

  if (!copy.language) {
    copy.language = {
      enabled: false,
      vocab: {},
    };
  }

  if (!copy.reminders) {
    copy.reminders = [];
  }

  return copy as DBGuild;
};

export class GuildService {
  constructor(private dbService: DBService) {}

  ensureGuild(guildId?: string) {
    if (!guildId) {
      return;
    }

    const data = this.dbService.get();

    data[guildId] = updateGuild(guildId, data[guildId] ?? {});

    this.dbService.set(data);
  }

  getGuild(guildId: string) {
    return this.dbService.get()[guildId];
  }

  setGuild(guild: DBGuild) {
    const db = this.dbService.get();

    db[guild.id] = guild;

    return this.dbService.set(db);
  }

  getGuilds() {
    return Object.values(this.dbService.get());
  }
}
