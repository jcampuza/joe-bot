import { TalkService } from '../../data/talk';
import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-edit',

  description: 'Delete a talking point by its ID',

  async execute(message, args, { appContext: { talkService } }) {
    const [rawId, ...text] = args;
    const id = parseInt(rawId);

    const talkingPoints = talkService.getTalkingPoints(message.guild!.id);

    if (!id || isNaN(id) || !talkingPoints[id - 1]) {
      return message.reply('A valid talking point id is required');
    }

    if (!text.length) {
      return message.reply('No edits found');
    }

    talkService.updateTalkingPoint(message.guild!.id, id, text.join(' '));

    await message.reply('Talking point Updated');
    await message.channel.send(
      talkService.formatTalkingPoints(message.guild!.id)
    );
  },
});
