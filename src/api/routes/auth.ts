import { RequestHandler, RequestParamHandler, Router } from 'express';

interface LoginRequestParams {
  username: string;
  password: string;
}

export const login: RequestHandler<LoginRequestParams> = async (
  request,
  response
) => {
  const { userRepo } = request.context.repositories;
  const { authService } = request.context.services;

  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    return response.status(400).json({ error: 'Username or Password missing' });
  }

  const user = await userRepo.findOne({ username });
  if (!user) {
    return response.status(400).json({ error: 'Login attempt failed' });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return response.status(400).json({ error: 'Login attempt failed' });
  }

  const token = await authService.createAccessToken(user);
  return response.status(201).json({ token, user });
};

export const authRoutes = Router().post('/login', login);
