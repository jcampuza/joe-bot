import { createCommand } from '../command';
import { clearTalkingPoints, formatTalkingPoints } from '../services/talk';

export default createCommand({
  name: 'talk-clear',

  description: 'Clear all talking point',

  execute(message, args) {
    clearTalkingPoints(message.guild!.id);

    message.reply('Talking points cleared');
    message.channel.send(formatTalkingPoints(message.guild!.id));
  },
});
