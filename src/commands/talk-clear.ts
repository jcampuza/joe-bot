import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-clear',

  description: 'Clear all talking point',

  execute(message, _, { talkService }) {
    talkService.clearTalkingPoints(message.guild!.id);

    message.reply('Talking points cleared');
    message.channel.send(talkService.formatTalkingPoints(message.guild!.id));
  },
});
