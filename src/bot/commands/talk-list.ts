import { TalkService } from '../../data/talk';
import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-list',

  description: 'List all talking points',

  async execute(message, _, { appContext: { talkService } }) {
    await message.reply(talkService.formatTalkingPoints(message.guild!.id));
  },
});
