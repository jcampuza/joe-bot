import { createCommand } from '../lib/command';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.OPEN_WEATHER_API_KEY,
    units: 'imperial',
  },
});

export default createCommand({
  name: 'weather',

  description: 'Fetch the current weather',

  execute: async (msg, args) => {
    const q = args.join(' ');

    try {
      const { data } = await client.get('/weather', {
        params: {
          q,
        },
      });

      const title = `Current weather for ${data.name}`;
      const type = `${data.weather[0].main}: ${data.weather[0].description}`;
      const temp = `Temp: ${data.main.temp}, Feels Like: ${data.main.feels_like}`;
      const wind = `Wind: ${data.wind.speed}`;

      const response = [title, type, temp, wind].join('\n');

      return msg.reply(response);
    } catch (err) {
      return msg.reply(`Oops, there was a problem fetching weather for ${q}`);
    }
  },
});
