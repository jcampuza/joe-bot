import { createCommand } from '../lib/command';

const valid = ['true', 'false'];

const convertStringToBool = (value: string) => {
  if (value === 'true') {
    return true;
  } else {
    return false;
  }
};

export default createCommand({
  name: 'vocab-toggle',

  description:
    'Turns listening for vocabulary on. Sentences in the structure of "Term" = "Term" will be picked up',

  async execute(message, args, { languageService }) {
    if (!args.length) {
      return message.reply('A value or true or false must be provided');
    }

    const value = args[0].toLowerCase().trim();
    const toggle = valid.find((validValue) => validValue === value) ?? '';
    if (!valid.includes(toggle)) {
      return message.reply(
        `A valid value must be provided. Options are: ${valid.join('/')}`
      );
    }

    const bool = convertStringToBool(toggle);
    languageService.toggleLanguageService(message.guild!.id, bool);

    await message.reply(`Vocab listener ${bool ? 'enabled' : 'disabled'}`);
  },
});
