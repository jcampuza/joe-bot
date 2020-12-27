import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authService } = req.context.services;
  const { userRepo } = req.context.repositories;
  const accessToken = req.headers.authorization || '';

  try {
    const token = await authService.verifyAccessToken(accessToken);
    const user = await userRepo.findOne(token.userId);
    if (!user) {
      return res.status(401).json({ err: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ err: 'Unauthorized' });
  }
};
