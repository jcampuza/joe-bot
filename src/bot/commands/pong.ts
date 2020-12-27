import { createCommand } from '../lib/command';

export default createCommand({
  name: 'ping',

  description: 'Ping!',

  async execute(message, args) {
    await message.reply('Pong');
  },
});
