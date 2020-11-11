import { createCommand } from '../command';

export default createCommand({
  name: 'talk-list',

  description: 'List all talking points',

  execute(message, _, { talkService }) {
    message.reply(talkService.formatTalkingPoints(message.guild!.id));
  },
});
