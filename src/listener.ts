import * as Discord from 'discord.js';
import { Context } from './context';

export interface Listener {
  name: string;
  description: string;
  enabled: (message: Discord.Message, context: Context) => void;
  execute: (message: Discord.Message, context: Context) => void;
}

export const createListener = (listener: Listener) => listener;
