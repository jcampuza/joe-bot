declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | undefined;
      PREFIX: string;
      TOKEN: string;
    }
  }
}

export default {
  prefix: process.env.PREFIX,
  token: process.env.TOKEN,
};
