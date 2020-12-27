import { RequestHandler, Router } from 'express';
import { DBService } from '../../data/db';
import { authMiddleware } from '../lib/authMiddeware';

const getDB: RequestHandler = (req, res, next) => {
  const dbService = req.context.app.get(DBService);

  const data = dbService.get();
  res.status(200).json({ data });
};

export const botRoutes = Router().use(authMiddleware).get('/json', getDB);
