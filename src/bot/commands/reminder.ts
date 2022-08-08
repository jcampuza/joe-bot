import { createCommand } from '../lib/command';
import { parse } from 'chrono-node';
import { ReminderService } from '../../data/reminders';

const reminderRegex = /(?<time>(in|at) .+) send (?<message>.+)/i;

const parseReminder = (message: string) => {
  const match = message.match(reminderRegex);

  if (!match?.groups?.time || !match?.groups?.message) {
    return null;
  }

  const parsed = parse(`${match.groups.time} utc-06`)[0];

  if (!parsed) {
    return null;
  }

  return {
    time: parsed.date(),
    message: match.groups.message,
  };
};

export default createCommand({
  name: 'reminder',

  description:
    'Adds a reminder, when the given time expires a message will be sent back to yourself.\nAll times in CST',

  async execute(message, args, { guildId, appContext: { reminderService } }) {
    if (!args.length) {
      return message.reply(
        'No reminder was present: \nformat: `(at|in) [time] (send) [message]`\nex: `in 2 minutes send Hello!`'
      );
    }

    const parsed = parseReminder(message.content);

    if (!parsed) {
      await message.reply(
        'Unable to parse reminder: \nformat: `(at|in) [time] (send) [message]`\nex: `in 2 minutes send Hello!`'
      );
      return;
    }

    reminderService.createReminder(guildId, {
      message: parsed.message,
      time: parsed.time.toISOString(),
      userId: message.author.id,
      user: message.author.toString(),
    });

    await message.reply('Reminder set 👍');
  },
});
