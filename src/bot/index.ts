import Disord from 'discord.js';
import { Command } from './lib/command';
import Commands from './commands';
import Listeners from './listeners';
import config from '../config/config';
import { ApplicationContext, CommandContext } from '../context';
import { GuildService } from '../data/guild';
import { ReminderService } from '../data/reminders';
import { JobService } from '../data/job';

const { prefix, token } = config;

export async function startBot(appContext: ApplicationContext) {
  // Create/Initialize available commands collection
  const commands = new Disord.Collection<string, Command>();

  for (const command of Object.values(Commands)) {
    commands.set(command.name, command);
  }

  // Setup client and add to context
  const client = new Disord.Client();
  appContext.add(Disord.Client, client);

  // Ensure all gilds DB's are up to date
  appContext.get(GuildService).ensureAllGuilds();

  client.once('ready', () => {
    console.log('Joe Bot successfully connected and ready');
  });

  client.on('message', (message) => {
    if (message.author.bot) {
      return;
    }

    // Parse arguments
    const guildId = message.guild?.id;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    // Ensure the guild is setup in the DB before handling a command or listener
    const context = new CommandContext(commands, message, appContext);
    context.get(GuildService).ensureGuild(guildId);

    const runCommand = () => {
      if (!message.content.startsWith(prefix)) {
        return false;
      }

      if (!command || !commands.get(command)) {
        return false;
      }

      // Run command
      try {
        commands.get(command)!.execute(message, args, context);
      } catch (error) {
        console.error(error);
        message.reply(`There was an issue executing command: ${command}`);
      }

      return true;
    };

    const runListeners = () => {
      try {
        const enabledListeners = Object.values(Listeners).filter((listener) =>
          listener.enabled(message, context)
        );

        for (const listener of enabledListeners) {
          listener.execute(message, context);
        }
      } catch (error) {
        console.error(error);
        message.reply('A listener failed to run on this message');
      }
    };

    const ranCommand = runCommand();

    // Don't run listeners on commands
    if (!ranCommand) {
      runListeners();
    }
  });

  client.login(token).then(() => {
    const reminderService = appContext.get(ReminderService);
    const jobService = appContext.get(JobService);

    const reminderJob = jobService.createJob('reminders', 1000, () =>
      reminderService.sendExpiredReminders(client)
    );

    reminderJob.start();
  });
}
