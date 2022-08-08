import { Collection, Message } from 'discord.js';
import { Command } from './bot/lib/command';
import { createDbService } from './data/db';
import { createGuildService } from './data/guild';
import { createJobService } from './data/job';
import { createLanguageService } from './data/language';
import { createReminderService } from './data/reminders';
import { createTalkService } from './data/talk';

export const createCommandContext = (
  commands: Collection<string, Command>,
  message: Message,
  appContext: AppContext
) => {
  return {
    guildId: message.guild!.id,
    commands,
    appContext,
    message,
  };
};

export type CommandContext = ReturnType<typeof createCommandContext>;

export const createApplicationContext = () => {
  const dbService = createDbService();
  const guildService = createGuildService(dbService);
  const talkService = createTalkService(dbService);
  const languageService = createLanguageService(dbService, guildService);
  const jobService = createJobService();
  const reminderService = createReminderService(guildService, dbService);

  return {
    dbService,
    guildService,
    talkService,
    languageService,
    jobService,
    reminderService,
  };
};

export type AppContext = ReturnType<typeof createApplicationContext>;
