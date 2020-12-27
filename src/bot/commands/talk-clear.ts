import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-clear',

  description: 'Clear all talking point',

  async execute(message, _, { talkService }) {
    talkService.clearTalkingPoints(message.guild!.id);

    await message.reply('Talking points cleared');
    await message.channel.send(
      talkService.formatTalkingPoints(message.guild!.id)
    );
  },
});
