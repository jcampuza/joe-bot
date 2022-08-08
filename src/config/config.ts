declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | undefined;
      PREFIX: string;
      DISCORD_TOKEN: string;
      AUTH_SECRET: string;
      ADMIN_USERNAME: string;
      ADMIN_PASSWORD: string;
    }
  }
}

export default {
  prefix: process.env.PREFIX,
  discordToken: process.env.DISCORD_TOKEN,
  authSecret: process.env.AUTH_SECRET,
};
