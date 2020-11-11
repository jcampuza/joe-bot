import { createCommand } from '../command';

export default createCommand({
  name: 'talk-help',

  description: 'List talking points related commands',

  execute(message, args, { commands }) {
    const talkCommands = commands.filter((value, key) =>
      value.name.startsWith('talk')
    );

    const formatted = talkCommands.map(
      (command) => `${command.name}: ${command.description}`
    );

    const response = ['Talking points related commands:', ...formatted].join(
      '\n'
    );

    message.reply(response);
  },
});
