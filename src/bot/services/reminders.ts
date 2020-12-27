import { isFulfilled, reflect, uuid } from '../lib/helpers';
import { DBService, Reminder } from './db';
import { GuildService } from './guild';
import Disord, { Client } from 'discord.js';
import { userInfo } from 'os';
import { resolve } from 'path';

export class ReminderService {
  constructor(
    private guildService: GuildService,
    private dbService: DBService,
    private client: Client
  ) {}

  getReminders(guildId: string) {
    const guild = this.guildService.getGuild(guildId);

    return guild.reminders;
  }

  getExpiredReminders(guildId: string) {
    const guild = this.guildService.getGuild(guildId);

    const now = Date.now();

    return guild.reminders.filter((reminder) => {
      return new Date(reminder.time).getTime() < now;
    });
  }

  removeReminder(reminderId: string) {
    const guilds = this.guildService.getGuilds();

    // Find Guild which contains this reminder
    const guild = guilds.find((guild) => {
      return guild.reminders.find((reminder) => reminder.id === reminderId);
    });

    if (!guild) {
      return false;
    }

    // Remove this reminder from guild
    guild.reminders = guild.reminders.filter(
      (reminder) => reminder.id !== reminderId
    );

    this.guildService.setGuild(guild);
  }

  createReminder(guildId: string, reminder: Omit<Reminder, 'id' | 'guildId'>) {
    const guild = this.guildService.getGuild(guildId);

    guild.reminders = [
      ...guild.reminders,
      {
        id: uuid(),
        guildId,
        ...reminder,
      },
    ];

    this.guildService.setGuild(guild);
  }

  getAllReminders() {
    const db = this.dbService.get();

    return Object.entries(db).reduce((acc, [id, db]) => {
      return [...acc, ...db.reminders];
    }, [] as Reminder[]);
  }

  getAllExpiredReminders() {
    const now = Date.now();

    return this.getAllReminders().filter((reminder) => {
      return new Date(reminder.time).getTime() < now;
    });
  }

  async sendExpiredReminders() {
    const expiredReminders = this.getAllExpiredReminders();

    const promises = expiredReminders.map((reminder) => {
      const promise = this.client.users
        .fetch(reminder.userId)
        .then((user) => user.send(`Reminder: ${reminder.message}`))
        .then(() => reminder);

      return reflect(promise);
    });

    const responses = await Promise.all(promises);

    const successfulResponses = responses.filter(isFulfilled);

    for (const successfulResponse of successfulResponses) {
      this.removeReminder(successfulResponse.result.id);
    }
  }
}
