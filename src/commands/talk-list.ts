import { createCommand } from '../command';
import { formatTalkingPoints } from '../services/talk';

export default createCommand({
  name: 'talk-list',

  description: 'List all talking points',

  execute(message) {
    message.reply(formatTalkingPoints(message.guild!.id));
  },
});
