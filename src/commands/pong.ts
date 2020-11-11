import { createCommand } from '../command';

export default createCommand({
  name: 'ping',

  description: 'Ping!',

  execute(message, args) {
    message.reply('Pong');
  },
});
