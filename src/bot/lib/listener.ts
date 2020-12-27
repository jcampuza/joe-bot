import * as Discord from 'discord.js';
import { CommandContext } from '../../context';

export interface Listener {
  name: string;
  description: string;
  enabled: (message: Discord.Message, context: CommandContext) => void;
  execute: (message: Discord.Message, context: CommandContext) => void;
}

export const createListener = (listener: Listener) => listener;
