import * as Discord from 'discord.js';
import { CommandContext } from '../../context';

export interface Command {
  name: string;
  description: string;
  execute(
    message: Discord.Message,
    args: string[],
    context: CommandContext
  ): void;
}

/**
 * Small wrapper func to easily enforce interface for command
 */
export const createCommand = (command: Command) => command;
