// Shims
require('dotenv').config();
import 'reflect-metadata';

// Projects
import { startBot } from './bot';
import { startApi } from './api';
import { ApplicationContext } from './context';
import { DBService } from './data/db';
import { GuildService } from './data/guild';
import { TalkService } from './data/talk';
import { LanguageService } from './data/language';
import { ReminderService } from './data/reminders';
import { JobService } from './data/job';

const applicationContext = new ApplicationContext();

applicationContext.add(DBService, new DBService());

applicationContext.add(
  GuildService,
  new GuildService(applicationContext.get(DBService))
);

applicationContext.add(
  TalkService,
  new TalkService(applicationContext.get(DBService))
);

applicationContext.add(
  LanguageService,
  new LanguageService(
    applicationContext.get(DBService),
    applicationContext.get(GuildService)
  )
);

applicationContext.add(JobService, new JobService());

applicationContext.add(
  ReminderService,
  new ReminderService(
    applicationContext.get(GuildService),
    applicationContext.get(DBService)
  )
);

// Reminder service can't be started until we have a client
startBot(applicationContext);
startApi(applicationContext);
