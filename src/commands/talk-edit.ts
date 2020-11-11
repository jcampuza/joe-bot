import { createCommand } from '../command';

export default createCommand({
  name: 'talk-edit',

  description: 'Delete a talking point by its ID',

  execute(message, args, { talkService }) {
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

    message.reply('Talking point Updated');
    message.channel.send(talkService.formatTalkingPoints(message.guild!.id));
  },
});