import { createCommand } from '../lib/command';
import config from '../../config/config';

export default createCommand({
  name: 'help',

  description: 'Help command',

  async execute(message, args, { commands }) {
    const formatted = commands.map(
      (command) => `${config.prefix}${command.name}: ${command.description}`
    );

    const response = [
      'All commands description points related commands:',
      ...formatted,
    ].join('\n');

    await message.reply(response);
  },
});
