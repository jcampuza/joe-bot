import { RequestHandler, Router } from 'express';
import { authRoutes } from './auth';

const health: RequestHandler = (req, res, next) => {
  res.json({
    ok: true,
  });
};

export const apiRouter = Router()
  .use('/auth', authRoutes)
  .get('/health', health);
