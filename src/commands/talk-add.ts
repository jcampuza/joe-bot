import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-add',

  description: 'Add a talking point',

  execute(message, args, { talkService }) {
    if (!args.length) {
      return message.reply('No talking point was set');
    }

    talkService.setTalkingPoint(message.guild!.id, args.join(' '));

    message.reply('Talking point added!');
    message.channel.send(talkService.formatTalkingPoints(message.guild!.id));
  },
});
