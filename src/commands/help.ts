import { createCommand } from '../command';
import config from '../config';

export default createCommand({
  name: 'help',

  description: 'Help command',

  execute(message, args, { commands }) {
    const formatted = commands.map(
      (command) => `${config.prefix}-${command.name}: ${command.description}`
    );

    const response = [
      'All commands description points related commands:',
      ...formatted,
    ].join('\n');

    return message.reply(response);
  },
});
