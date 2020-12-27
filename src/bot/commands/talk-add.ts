import { TalkService } from '../../data/talk';
import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-add',

  description: 'Add a talking point',

  async execute(message, args, context) {
    const talkService = context.get(TalkService);

    if (!args.length) {
      return message.reply('No talking point was set');
    }

    talkService.setTalkingPoint(message.guild!.id, args.join(' '));

    await message.reply('Talking point added!');
    await message.channel.send(
      talkService.formatTalkingPoints(message.guild!.id)
    );
  },
});
