import express, { json, urlencoded } from 'express';
import 'express-async-errors';

import cors from 'cors';
import path from 'path';
import { apiRouter } from './routes/routes';

import {
  createConnection,
  ConnectionOptions,
  Connection,
  Repository,
} from 'typeorm';
import { User } from './entities/user';
import { ROOT } from '../paths';
import { AuthService } from './services/auth';
import { ApplicationContext } from '../context';

declare global {
  namespace Express {
    export interface Request {
      user: User;
      context: {
        app: ApplicationContext;
        db: Connection;
        repositories: {
          userRepo: Repository<User>;
        };
        services: {
          authService: AuthService;
        };
      };
    }
  }
}

const options: ConnectionOptions = {
  type: 'sqlite',
  database: path.join(ROOT, 'joe-bot.db'),
  entities: [User],
  logging: true,
};

export async function startApi(appContext: ApplicationContext) {
  const connection = await createConnection(options);
  const userRepo = await connection.getRepository(User);
  const authService = new AuthService();

  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use((req, res, next) => {
    req.context = {
      app: appContext,
      db: connection,
      repositories: {
        userRepo,
      },
      services: {
        authService,
      },
    };

    next();
  });

  app.use('/api', apiRouter);

  app.listen(8080, () => {
    console.log('Api listening on port 8080');
  });
}
