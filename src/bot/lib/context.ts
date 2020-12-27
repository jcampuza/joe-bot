import { Client, Collection, Message } from 'discord.js';
import { Command } from './command';
import { DBService } from '../services/db';
import { GuildService } from '../services/guild';
import { LanguageService } from '../services/language';
import { TalkService } from '../services/talk';
import { ReminderService } from '../services/reminders';
import { JobService } from '../services/job';

/**
 * Creats context that is available for commands to use per request
 */
export const createContext = (
  commands: Collection<string, Command>,
  message: Message,
  appContext: AppContext
) => {
  const guildId = message.guild!.id;
  const {
    dbService,
    guildService,
    languageService,
    reminderService,
    talkService,
  } = appContext;

  return {
    guildId,
    commands,
    guildService,
    talkService,
    languageService,
    reminderService,
    dbService,
  };
};

export type Context = ReturnType<typeof createContext>;

export const createApplicationContext = (client: Client) => {
  const dbService = new DBService();
  const guildService = new GuildService(dbService);
  const talkService = new TalkService(dbService);
  const languageService = new LanguageService(dbService, guildService);
  const reminderService = new ReminderService(guildService, dbService, client);
  const jobService = new JobService();

  return {
    guildService,
    talkService,
    languageService,
    reminderService,
    dbService,
    jobService,
  };
};

export type AppContext = ReturnType<typeof createApplicationContext>;
