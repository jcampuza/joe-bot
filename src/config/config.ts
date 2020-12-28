declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | undefined;
      PREFIX: string;
      TOKEN: string;
      AUTH_SECRET: string;
      ADMIN_USERNAME: string;
      ADMIN_PASSWORD: string;
    }
  }
}

export default {
  prefix: process.env.PREFIX,
  token: process.env.TOKEN,
  authSecret: process.env.AUTH_SECRET,
};
