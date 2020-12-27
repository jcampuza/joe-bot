import { createCommand } from '../lib/command';

export default createCommand({
  name: 'talk-help',

  description: 'List talking points related commands',

  async execute(message, args, { commands }) {
    const talkCommands = commands.filter((value, key) =>
      value.name.startsWith('talk')
    );

    const formatted = talkCommands.map(
      (command) => `${command.name}: ${command.description}`
    );

    const response = ['Talking points related commands:', ...formatted].join(
      '\n'
    );

    await message.reply(response);
  },
});
