import Disord from 'discord.js';
import { Command } from './lib/command';
import Commands from './commands';
import Listeners from './listeners';
import config from '../config/config';
import { AppContext, createCommandContext } from '../context';
import { logger } from './lib/logger';

const { prefix, discordToken } = config;

export async function startBot(appContext: AppContext) {
  // Ensure all gilds DB's are up to date
  appContext.guildService.ensureAllGuilds();

  // Create/Initialize available commands collection
  const commands = new Disord.Collection<string, Command>(
    Object.values(Commands).map((command) => [command.name, command])
  );

  // Setup client
  const client = new Disord.Client();

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

    // Ensure the guild is setup in the DB before handling a command or listener
    const context = createCommandContext(commands, message, appContext);
    context.appContext.guildService.ensureGuild(guildId);

    const runCommand = () => {
      if (!message.content.startsWith(prefix)) {
        return false;
      }

      const command = commands.get(args.shift()?.toLowerCase() ?? '');
      if (!command) {
        return false;
      }

      // Run command
      try {
        logger.log('Running command', command.name);
        command.execute(message, args, context);
      } catch (error) {
        console.error(error);
        message.reply(`There was an issue executing command: ${command}`);
      }

      return true;
    };

    const runListeners = () => {
      try {
        for (const listener of Object.values(Listeners)) {
          if (listener.enabled(message, context)) {
            logger.debug('Running listener', listener.name);
            listener.execute(message, context);
          }
        }
      } catch (error) {
        logger.error(error);
        message.reply('A listener failed to run on this message');
      }
    };

    const ranCommand = runCommand();

    // Don't run listeners on commands
    if (!ranCommand) {
      runListeners();
    }
  });

  client.login(discordToken).then(() => {
    const { reminderService, jobService } = appContext;

    const reminderJob = jobService.addJob('reminders', 1000, () =>
      reminderService.sendExpiredReminders(client)
    );

    reminderJob.start();
  });
}
