import { createCommand } from '../command';
import { setTalkingPoint, formatTalkingPoints } from '../services/talk';

export default createCommand({
  name: 'talk-add',

  description: 'Add a talking point',

  execute(message, args) {
    if (!args.length) {
      return message.reply('No talking point was set');
    }

    setTalkingPoint(message.guild!.id, args.join(' '));

    message.reply('Talking point added!');
    message.channel.send(formatTalkingPoints(message.guild!.id));
  },
});
