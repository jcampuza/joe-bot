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

export const createGuildService = (dbService: DBService) => {
  const ensureGuild = (guildId?: string) => {
    if (!guildId) {
      return;
    }

    const data = dbService.get();

    data[guildId] = updateGuild(guildId, data[guildId] ?? {});

    dbService.set(data);
  };

  const ensureAllGuilds = () => {
    const data = dbService.get();

    for (const guild of Object.values(data)) {
      ensureGuild(guild.id);
    }
  };

  const getGuild = (guildId: string) => {
    return dbService.get()[guildId];
  };

  const setGuild = (guild: DBGuild) => {
    const db = dbService.get();

    db[guild.id] = guild;

    return dbService.set(db);
  };

  const getGuilds = () => {
    return Object.values(dbService.get());
  };

  return {
    ensureGuild,
    ensureAllGuilds,
    getGuild,
    setGuild,
    getGuilds,
  };
};

export type GuildService = ReturnType<typeof createGuildService>;
