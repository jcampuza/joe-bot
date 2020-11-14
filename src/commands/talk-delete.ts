import { createCommand } from '../command';

export default createCommand({
  name: 'talk-delete',

  description: 'Delete a talking point by its ID',

  execute(message, args, { talkService }) {
    const rawIdList = args[0];

    if (!rawIdList.length) {
      return message.reply('A valid talking point id is required');
    }

    const idList = rawIdList.split(',').map((id) => Number(id));

    if (!idList.length || idList.some((id) => isNaN(id))) {
      return message.reply('A valid talking point id is required');
    }

    const count = talkService.deleteTalkingPoints(message.guild!.id, idList);

    message.reply(`${count} Talking points deleted`);
    message.channel.send(talkService.formatTalkingPoints(message.guild!.id));
  },
});
