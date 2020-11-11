import * as Discord from 'discord.js';

export interface Command {
  name: string;
  description: string;
  execute: (
    message: Discord.Message,
    args: string[],
    commands: Discord.Collection<string, Command>
  ) => void;
}

export const createCommand = (command: Command) => command;
