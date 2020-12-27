import { RequestHandler, Router } from 'express';
import { authRoutes } from './auth';
import { botRoutes } from './bot';

const health: RequestHandler = (req, res, next) => {
  console.log('HELLO');
  res.json({
    ok: true,
  });
};

export const apiRouter = Router()
  .use('/auth', authRoutes)
  .use('/bot', botRoutes)
  .get('/health', health);
