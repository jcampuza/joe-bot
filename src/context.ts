import { Client, Collection, Message } from 'discord.js';
import { Command } from './bot/lib/command';
import { DBService } from './data/db';
import { GuildService } from './data/guild';
import { LanguageService } from './data/language';
import { TalkService } from './data/talk';
import { ReminderService } from './data/reminders';
import { JobService } from './data/job';

export class CommandContext {
  guildId: string;

  constructor(
    public commands: Collection<string, Command>,
    public message: Message,
    private applicationContext: ApplicationContext
  ) {
    this.guildId = message.guild!.id;
  }

  get<T = AppContext[keyof AppContext]>(klass: ConstructorOf<T>): T {
    return this.applicationContext.get(klass) as T;
  }
}

interface AppContext {
  dbService: DBService;
  guildService: GuildService;
  talkService: TalkService;
  languageService: LanguageService;
  reminderService: ReminderService;
  jobService: JobService;
}

type ConstructorOf<T> = { new (...args: any[]): T };

export class ApplicationContext {
  depMap = new Map<ConstructorOf<unknown>, unknown>();

  add<T>(klass: ConstructorOf<T>, instance: T) {
    this.depMap.set(klass, instance);

    return this;
  }

  get<T>(klass: ConstructorOf<T>): T {
    return this.depMap.get(klass) as T;
  }
}
