import { Client } from 'discord.js';
import { isFulfilled, reflect, uuid } from '../bot/lib/helpers';
import { DBService, Reminder } from './db';
import { GuildService } from './guild';

export const createReminderService = (
  guildService: GuildService,
  dbService: DBService
) => {
  const getReminders = (guildId: string) => {
    const guild = guildService.getGuild(guildId);

    return guild.reminders;
  };

  const getExpiredReminders = (guildId: string) => {
    const guild = guildService.getGuild(guildId);

    const now = Date.now();

    return guild.reminders.filter((reminder) => {
      return new Date(reminder.time).getTime() < now;
    });
  };

  const removeReminder = (reminderId: string) => {
    const guilds = guildService.getGuilds();

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

    guildService.setGuild(guild);
  };

  const createReminder = (
    guildId: string,
    reminder: Omit<Reminder, 'id' | 'guildId'>
  ) => {
    const guild = guildService.getGuild(guildId);

    guild.reminders = [
      ...guild.reminders,
      {
        id: uuid(),
        guildId,
        ...reminder,
      },
    ];

    guildService.setGuild(guild);
  };

  const getAllReminders = () => {
    const db = dbService.get();

    return Object.entries(db).reduce((acc, [id, db]) => {
      return [...acc, ...db.reminders];
    }, [] as Reminder[]);
  };

  const getAllExpiredReminders = () => {
    const now = Date.now();

    return getAllReminders().filter((reminder) => {
      return new Date(reminder.time).getTime() < now;
    });
  };

  const sendExpiredReminders = async (client: Client) => {
    const expiredReminders = getAllExpiredReminders();

    const promises = expiredReminders.map((reminder) => {
      const promise = client.users
        .fetch(reminder.userId)
        .then((user) => user.send(`Reminder: ${reminder.message}`))
        .then(() => reminder);

      return reflect(promise);
    });

    const responses = await Promise.all(promises);

    const successfulResponses = responses.filter(isFulfilled);

    for (const successfulResponse of successfulResponses) {
      removeReminder(successfulResponse.result.id);
    }
  };

  return {
    getReminders,
    getExpiredReminders,
    getAllExpiredReminders,
    sendExpiredReminders,
    removeReminder,
    createReminder,
  };
};

export type ReminderService = ReturnType<typeof createReminderService>;
